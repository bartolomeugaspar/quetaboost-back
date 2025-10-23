const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all published posts (public)
router.get('/', async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Error fetching posts', details: error.message });
  }
});

// Get single post by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment views
    await supabase
      .from('posts')
      .update({ views: post.views + 1 })
      .eq('id', post.id);

    res.json({ post: { ...post, views: post.views + 1 } });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Error fetching post', details: error.message });
  }
});

// Get all posts (admin only - includes drafts)
router.get('/admin/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ posts });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ error: 'Error fetching posts', details: error.message });
  }
});

// Create new post (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, content, excerpt, image, category, tags, status } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('posts')
      .select('slug')
      .eq('slug', slug)
      .single();

    let finalSlug = slug;
    if (existingPost) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const { data: newPost, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          slug: finalSlug,
          content,
          excerpt: excerpt || content.substring(0, 150) + '...',
          image: image || null,
          category: category || 'Geral',
          tags: tags || [],
          status: status || 'draft',
          author_id: req.user.id,
          views: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Error creating post', details: error.message });
  }
});

// Update post (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, image, category, tags, status } = req.body;

    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (title) {
      updateData.title = title;
      // Update slug if title changed
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (image !== undefined) updateData.image = image;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    if (status) updateData.status = status;

    const { data: updatedPost, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Error updating post', details: error.message });
  }
});

// Delete post (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Error deleting post', details: error.message });
  }
});

// Get posts by category (public)
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;

    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ posts });
  } catch (error) {
    console.error('Get posts by category error:', error);
    res.status(500).json({ error: 'Error fetching posts', details: error.message });
  }
});

module.exports = router;
