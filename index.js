let danhSachSinhVien = [];
const LOCALSTORAGE_DSSV = 'SinhVien';
const btnSearchEl = document.getElementById('btnSearch');
const spanMaSinhVienEl = document.getElementById('spanMaSV');
const spanTenSinhVienEl = document.getElementById('spanTenSV');
const spanEmailSinhVienEl = document.getElementById('spanEmailSV');
const spanMatKhauSinhVienEl = document.getElementById('spanPass');
const spanNgaySinhSinhVienEl = document.getElementById('spanNgaySinh');
const spanKhoaHocSinhVienEl = document.getElementById('spanKhoaHoc');
const spanToanSinhVienEl = document.getElementById('spanDiemToan');
const spanLySinhVienEl = document.getElementById('spanDiemLy');
const spanHoaSinhVienEl = document.getElementById('spanDiemHoa');
const searchEl = document.getElementById('txtSearch');
const maSinhVienEl = document.getElementById('txtMaSV');
const tenSinhVienEl = document.getElementById('txtTenSV');
const passSinhVienEl = document.getElementById('txtPass');
const emailSinhVienEl = document.getElementById('txtEmailSV');
const ngaySinhSinhVienEl = document.getElementById('txtNgaySinh');
const khoaHocSinhVienEl = document.getElementById('slKhoaHoc');
const diemToanSinhVienEl = document.getElementById('txtDiemToan');
const diemLySinhVienEl = document.getElementById('txtDiemLy');
const diemHoaSinhVienEl = document.getElementById('txtDiemHoa');
const txtMaSV = 'txtMaSV';
const txtTenSV = 'txtTenSV';
const txtEmailSV = 'txtEmailSV';
const txtPass = 'txtPass';
const txtNgaySinh = 'txtNgaySinh';
const slKhoaHoc = 'slKhoaHoc';
const txtDiemToan = 'txtDiemToan';
const txtDiemLy = 'txtDiemLy';
const txtDiemHoa = 'txtDiemHoa';

const storeDataToLocalStorage = (key, danhSachSinhVien) => {
  localStorage.setItem(key, JSON.stringify(danhSachSinhVien));
};

const checkLocalStorage = (key) => {
  if (!localStorage.getItem(key)) {
    return (danhSachSinhVien = []);
  }
  danhSachSinhVien = JSON.parse(localStorage.getItem(key));
  const newDanhSachSinhVienArr = danhSachSinhVien.map((item) => {
    const { ma, ten, pass, email, ngaySinh, khoaHoc, toan, ly, hoa } = item;
    const sv = new SinhVien(ma, ten, pass, email, ngaySinh, khoaHoc, toan, ly, hoa);
    return sv;
  });
  danhSachSinhVien = [...newDanhSachSinhVienArr];
};

const renderSinhVien = (danhSachSinhVien) => {
  let contentHTML = '';
  if (!danhSachSinhVien.length) {
    return (document.getElementById('tbodySinhVien').innerHTML = contentHTML);
  }
  danhSachSinhVien.forEach((sinhVien) => {
    contentHTML += `
      <tr>
        <td>${sinhVien.ma}</td>
        <td>${sinhVien.ten}</td>
        <td>${sinhVien.email}</td>
        <td>${sinhVien.ngaySinh}</td>
        <td>${sinhVien.khoaHoc}</td>
        <td>${sinhVien.dtb()}</td>
        <td> <button type="" class="btn btn-success" onclick="suaSinhVien('${sinhVien.ma}')" >Sửa</button></td>
        <td> <button type="" class="btn btn-danger" onclick="xoaSV('${sinhVien.ma}')">Xóa</button> 
        </td>
      </tr>
     `;
    document.getElementById('tbodySinhVien').innerHTML = contentHTML;
  });
};

const layThongTin = () => {
  const maSinhVien = maSinhVienEl.value;
  const tenSinhVien = tenSinhVienEl.value;
  const passSinhVien = passSinhVienEl.value;
  const emailSinhVien = emailSinhVienEl.value;
  const ngaySinhSinhVien = ngaySinhSinhVienEl.value;
  const khoaHocSinhVien = khoaHocSinhVienEl.value;
  const diemToanSinhVien = +diemToanSinhVienEl.value.split(',').join('.');
  const diemLySinhVien = +diemLySinhVienEl.value.split(',').join('.');
  const diemHoaSinhVien = +diemHoaSinhVienEl.value.split(',').join('.');

  const sinhVien = new SinhVien(
    maSinhVien,
    tenSinhVien,
    passSinhVien,
    emailSinhVien,
    ngaySinhSinhVien,
    khoaHocSinhVien,
    diemToanSinhVien,
    diemLySinhVien,
    diemHoaSinhVien
  );
  return sinhVien;
};

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
  inputFields.forEach((itemForm) => {
    switch (true) {
      case itemForm.id === txtMaSV: {
        if (!itemForm.value.length) {
          spanMaSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }

        if (!itemForm.value.includes('SV', 0)) {
          spanMaSinhVienEl.innerText = 'Mã bắt đầu bằng SV vui lòng viết hoa';
          isValid = false;
          return;
        }
        spanMaSinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === txtTenSV: {
        if (!itemForm.value.length) {
          spanTenSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }

        if (!validationTenSinhVien(itemForm.value)) {
          spanTenSinhVienEl.innerText = 'Vui lòng nhập các ký tự aphabet, vì tên không có số';
          isValid = false;
          return;
        }

        spanTenSinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === txtEmailSV: {
        if (!itemForm.value.length) {
          spanEmailSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }

        if (!validationEmail(itemForm.value)) {
          spanEmailSinhVienEl.innerText = 'Email không hợp lệ';
          isValid = false;
          return;
        }
        spanEmailSinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === txtPass: {
        if (!itemForm.value.length) {
          spanMatKhauSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }

        if (!validationPassword(itemForm.value)) {
          spanMatKhauSinhVienEl.innerText = 'Password không hợp lệ, phái có ký tự in hoa,số,ký tự đặt biệt và dài hơn 8 ký tự';
          isValid = false;
          return;
        }
        spanMatKhauSinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === txtNgaySinh: {
        if (!itemForm.value.length) {
          spanNgaySinhSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }
        spanNgaySinhSinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === slKhoaHoc: {
        if (!itemForm.value.length) {
          spanKhoaHocSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }
        spanKhoaHocSinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === txtDiemLy: {
        if (!itemForm.value.length) {
          spanLySinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }

        if (isNaN(+itemForm.value.split(',').join('.'))) {
          spanLySinhVienEl.innerText = 'Vui lòng nhập số';
          isValid = false;
          return;
        }
        spanLySinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === txtDiemHoa: {
        if (!itemForm.value.length) {
          spanHoaSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }

        if (isNaN(+itemForm.value.split(',').join('.'))) {
          spanHoaSinhVienEl.innerText = 'Vui lòng nhập số';
          isValid = false;
          return;
        }

        spanHoaSinhVienEl.innerText = '';
        return;
      }

      case itemForm.id === txtDiemToan: {
        if (!itemForm.value.length) {
          spanToanSinhVienEl.innerText = 'Vui lòng nhập dữ liệu';
          isValid = false;
          return;
        }
        if (isNaN(+itemForm.value.split(',').join('.'))) {
          spanToanSinhVienEl.innerText = 'Vui lòng nhập số';
          isValid = false;
          return;
        }
        spanToanSinhVienEl.innerText = '';
        return;
      }
    }
  });
  return isValid;
};

const themSinhVien = () => {
  const sinhVien = layThongTin();
  const checkMaSV = kiemTraMaSV(sinhVien, danhSachSinhVien);
  const checkIsValid = validationForm();
  if (checkMaSV && checkIsValid) {
    danhSachSinhVien.push(sinhVien);
    storeDataToLocalStorage(LOCALSTORAGE_DSSV, danhSachSinhVien);
    renderSinhVien(danhSachSinhVien);
    resetForm();
  }
};

const timViTri = (ma, danhSachSinhVien) => {
  let viTri = -1;
  for (let index = 0; index < danhSachSinhVien.length; index++) {
    const sv = danhSachSinhVien[index];
    if (sv.ma == ma) {
      viTri = index;
      return viTri;
    }
  }
  return viTri;
};

const suaSinhVien = (ma) => {
  const viTri = timViTri(ma, danhSachSinhVien);
  if (viTri !== -1) {
    const currentSV = danhSachSinhVien[viTri];
    maSinhVienEl.value = currentSV.ma;
    maSinhVienEl.disabled = true;
    tenSinhVienEl.value = currentSV.ten;
    passSinhVienEl.value = currentSV.pass;
    emailSinhVienEl.value = currentSV.email;
    ngaySinhSinhVienEl.value = currentSV.ngaySinh;
    khoaHocSinhVienEl.value = currentSV.khoaHoc;
    diemToanSinhVienEl.value = currentSV.toan;
    diemLySinhVienEl.value = currentSV.ly;
    diemHoaSinhVienEl.value = currentSV.hoa;
  }
};

const capNhatSV = () => {
  const checkIsValid = validationForm();
  const sinhVien = layThongTin();
  const viTri = timViTri(sinhVien.ma, danhSachSinhVien);
  if (viTri !== -1 && checkIsValid) {
    danhSachSinhVien[viTri] = sinhVien;
    storeDataToLocalStorage(LOCALSTORAGE_DSSV, danhSachSinhVien);
    renderSinhVien(danhSachSinhVien);
    resetForm();
  }
};

const xoaSV = (ma) => {
  const viTri = timViTri(ma, danhSachSinhVien);
  if (viTri !== -1) {
    danhSachSinhVien.splice(viTri, 1);
    storeDataToLocalStorage(LOCALSTORAGE_DSSV, danhSachSinhVien);
    renderSinhVien(danhSachSinhVien);
  }
};

const resetForm = () => {
  maSinhVienEl.value = '';
  maSinhVienEl.disabled = false;
  tenSinhVienEl.value = '';
  passSinhVienEl.value = '';
  emailSinhVienEl.value = '';
  ngaySinhSinhVienEl.value = '';
  khoaHocSinhVienEl.value = '';
  diemToanSinhVienEl.value = '';
  diemLySinhVienEl.value = '';
  diemHoaSinhVienEl.value = '';
  spanMaSinhVienEl.innerText = '';
  spanTenSinhVienEl.innerText = '';
  spanEmailSinhVienEl.innerText = '';
  spanMatKhauSinhVienEl.innerText = '';
  spanNgaySinhSinhVienEl.innerText = '';
  spanKhoaHocSinhVienEl.innerText = '';
  spanToanSinhVienEl.innerText = '';
  spanLySinhVienEl.innerText = '';
  spanHoaSinhVienEl.innerText = '';
};

const timTenSinhVien = (e) => {
  const searchVal = searchEl.value.trim().toLowerCase();
  if (!searchVal.length) {
    return renderSinhVien(danhSachSinhVien);
  }

  if (e.type === 'click' || e.key === 'Enter') {
    const sinhVienFilterArr = danhSachSinhVien.filter((sinhVien) => {
      return sinhVien.ten.toLowerCase().indexOf(searchVal) > -1;
    });
    return renderSinhVien(sinhVienFilterArr);
  }
};

btnSearchEl.addEventListener('click', timTenSinhVien);
searchEl.addEventListener('keyup', timTenSinhVien);

checkLocalStorage(LOCALSTORAGE_DSSV);
renderSinhVien(danhSachSinhVien);
