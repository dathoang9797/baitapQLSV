const kiemTraMaSV = (newSV, arrSV) => {
  if (!arrSV.length) return true;
  const maSV = newSV.ma;
  for (let index = 0; index < arrSV.length; index++) {
    const currentSV = arrSV[index];
    if (currentSV.ma === maSV) {
      return false;
    }
  }
  return true;
};

const validationEmail = (value) => {
  const mailFormat =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!value.match(mailFormat)) {
    return false;
  }
  return true;
};

const validationPassword = (value) => {
  const passwordFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
  if (!value.match(passwordFormat)) {
    return false;
  }
  return true;
};

const validationTenSinhVien = (value) => {
  const tenSinhVienFormat =
    /^[a-zA-Z_áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịúùủũụưứừửữựýỳỷỹỵđÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÍÌỈĨỊÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ\s]+$/gu;

  if (!value.match(tenSinhVienFormat)) {
    return false;
  }
  return true;
};

const validationForm = () => {
  let isValid = true;
  const inputFields = document.querySelectorAll('form input,form select');
  const spanFields = document.querySelectorAll('form span');
  inputFields.forEach((itemForm, index) => {
    if (!itemForm.value.length) {
      spanFields[index].innerText = 'Vui lòng nhập dữ liệu';
      isValid = false;
      return;
    }

    if (itemForm === maSinhVienEl) {
      if (!itemForm.value.includes('SV', 0)) {
        spanFields[index].innerText = 'Mã bắt đầu bằng SV vui lòng viết hoa';
        isValid = false;
        return;
      }
    }

    if (itemForm === tenSinhVienEl) {
      if (!validationTenSinhVien(itemForm.value)) {
        spanFields[index].innerText = 'Vui lòng nhập các ký tự aphabet, vì tên không có số';
        isValid = false;
        return;
      }
    }

    if (itemForm === emailSinhVienEl) {
      if (!validationEmail(itemForm.value)) {
        spanFields[index].innerText = 'Email không hợp lệ';
        isValid = false;
        return;
      }
    }

    if (itemForm === passSinhVienEl) {
      if (!validationPassword(itemForm.value)) {
        spanFields[index].innerText = 'Password không hợp lệ, phái có ký tự in hoa,số,ký tự đặt biệt và dài hơn 8 ký tự';
        isValid = false;
        return;
      }
    }

    if (itemForm === diemLySinhVienEl || itemForm === diemHoaSinhVienEl || itemForm === diemToanSinhVienEl) {
      if (isNaN(+itemForm.value.split(',').join('.'))) {
        spanFields[index].innerText = 'Vui lòng nhập số';
        isValid = false;
        return;
      }
    }
  });

  return isValid;
};
