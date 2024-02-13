const handleDownload = async () => {
    try {
      const response = await fetch('https://pg-dissertation-management-system.onrender.com/download');
      const blob = await response.blob();

      // Create a temporary link and trigger a click event to initiate the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'example.txt'; // Replace with the desired file name
      link.click();

      // Clean up the temporary link
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  export default handleDownload;