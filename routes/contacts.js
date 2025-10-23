const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const { data: newContact, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message,
          status: 'new',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: newContact
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ error: 'Error submitting contact form', details: error.message });
  }
});

// Get all contacts (admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Error fetching contacts', details: error.message });
  }
});

// Update contact status (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'responded', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const { data: updatedContact, error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({
      message: 'Contact status updated successfully',
      contact: updatedContact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Error updating contact', details: error.message });
  }
});

// Delete contact (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Error deleting contact', details: error.message });
  }
});

module.exports = router;
