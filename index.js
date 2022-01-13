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

const themSinhVien = () => {
  const sinhVien = layThongTin();
  const checkMaSV = kiemTraMaSV(sinhVien, danhSachSinhVien);
  if (checkMaSV) {
    const checkIsValidVal = validationForm();
    if (checkIsValidVal) {
      danhSachSinhVien.push(sinhVien);
      storeDataToLocalStorage(LOCALSTORAGE_DSSV, danhSachSinhVien);
      renderSinhVien(danhSachSinhVien);
      resetForm();
    }
  }
};

const capNhatSV = () => {
  const sinhVien = layThongTin();
  const viTri = timViTri(sinhVien.ma, danhSachSinhVien);
  if (viTri !== -1) {
    const checkIsValidVal = validationForm();
    if (checkIsValidVal) {
      danhSachSinhVien[viTri] = sinhVien;
      storeDataToLocalStorage(LOCALSTORAGE_DSSV, danhSachSinhVien);
      renderSinhVien(danhSachSinhVien);
      resetForm();
    }
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
