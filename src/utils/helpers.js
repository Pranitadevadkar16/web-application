export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    // Simple formatting for US numbers
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };
  
  export const validateImageUrl = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.headers.get('content-type').startsWith('image');
    } catch {
      return false;
    }
  };

  // export const verifyImageUrl = async (url) => {
  //   try {
  //     const res = await fetch(url, { method: 'HEAD' });
  //     return res.ok; // Returns true if image exists
  //   } catch {
  //     return false;
  //   }
  // };