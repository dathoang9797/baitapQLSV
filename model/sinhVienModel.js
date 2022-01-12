const SinhVien = function (_ma, _ten, _pass, _email, _ngaySinh, _khoaHoc, _toan, _ly, _hoa) {
  this.ma = _ma;
  this.ten = _ten;
  this.pass = _pass;
  this.email = _email;
  this.ngaySinh = _ngaySinh;
  this.khoaHoc = _khoaHoc;
  this.toan = _toan;
  this.ly = _ly;
  this.hoa = _hoa;
  this.dtb = () => {
    return ((this.toan + this.ly + this.hoa) / 3).toFixed(2);
  };
};
