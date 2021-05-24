// Create post functionality for user created posts
async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="create-title"]').value;
    const post_content = document.querySelector('textarea[name="create-description"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.pure-form').addEventListener('submit', newFormHandler);