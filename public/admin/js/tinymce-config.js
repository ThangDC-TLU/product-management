tinymce.init({
  selector: 'textarea',
  
  // THÊM DÒNG NÀY VÀO ĐẦU CONFIG
  license_key: 'gpl', 
  
  // Các cấu hình cũ giữ nguyên
  plugins: 'image link code table lists',
  toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
  // ...
});