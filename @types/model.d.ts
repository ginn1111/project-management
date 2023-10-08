interface IBangCap {
  ID_BC?: string;
  TEN_BC?: string;
  GHI_CHU_BC?: OrNull<string>;
}
interface IChucVu {
  ID_CHV?: string;
  TEN_CHV?: string;
  GHI_CHU_CHV?: OrNull<string>;
}

interface IChungChi {
  ID_CHCH?: string;
  TEN_CHCH?: string;
  GHI_CHU_CHCH?: OrNull<string>;
}

interface ICongCu {
  ID_CC?: string;
  TEN_CC?: string;
  SL_CC?: number;
  GHI_CHU_CC?: OrNull<string>;
  IS_ACTIVE_CC?: boolean;
}

interface ICongCuDonVi {
  ID_CCDV?: string;
  ID_DV?: OrNull<string>;
  ID_CC?: OrNull<string>;
  IS_ACTIVE_CCDV?: Buffer;
}

interface ICongViec {
  ID_CV?: string;
  TEN_CV?: string;
  GHI_CHU_CV?: OrNull<string>;
  IS_ACTIVE_CV?: boolean;
}
interface IDanhGiaDauViec {
  ID_DGDV?: string;
  ID_MDDGDV?: OrNull<string>;
  ID_NVDV?: OrNull<string>;
  ID_NVDA?: OrNull<string>;
  NGAY_DGDV?: OrNull<string>;
  GHI_CHU_DGDV?: OrNull<string>;
}
interface IDanhGiaNhanVienDuAn {
  ID_DGNV?: string;
  ID_MDDGNVDA?: OrNull<string>;
  ID_NVDA?: OrNull<string>;
  ID_NVPB?: OrNull<string>;
  NGAY_DGNVDA?: string;
  GHI_CHU_DGNVDA?: OrNull<string>;
}

interface IDauViec {
  ID_DVC?: string;
  TEN_DVC?: string;
  GHI_CHU_DVC?: OrNull<string>;
}
interface IDauViecCongViec {
  ID_DVCV?: string;
  ID_CV?: OrNull<string>;
  ID_NVDV?: OrNull<string>;
  NGAY_HT_DK_DVCV?: OrNull<string>;
  NGAY_HT_DVCV?: OrNull<string>;
  GHI_CHU_DVCV?: OrNull<string>;
}
interface IDauXuatCongCu {
  ID_DXCC?: string;
  ID_CC?: OrNull<string>;
  ID_THDXDA?: OrNull<string>;
  SL_DXCC?: number;
}
interface IDeXuatDuAn {
  ID_DXDA?: string;
  ID_NVDA?: OrNull<string>;
  ID_NV?: OrNull<string>;
  NGAY_TAO_DXDA?: OrNull<string>;
  NGAY_DUYET_DXDA?: OrNull<string>;
  NOI_DUNG_DXDA?: OrNull<string>;
  GHI_CHU_DXDA?: OrNull<string>;
}
interface IDexuatNguyenLieu {
  ID_DXNL?: string;
  ID_THDXDA?: OrNull<string>;
  ID_NL?: OrNull<string>;
  SL_DXNL?: number;
}
interface IDeXuatVatTu {
  ID_DXVT?: string;
  ID_THDXDA?: OrNull<string>;
  ID_VT?: OrNull<string>;
  SL_DXVT?: number;
}
interface IDonVi {
  ID_DV?: string;
  TEN_DV?: string;
  GHI_CHU_DV?: OrNull<string>;
  IS_ACTIVE_DV?: boolean;
}
interface IDuAn {
  ID_DA?: string;
  TEN_DA?: string;
  NGAY_TAO_DA?: string;
  NGAY_BAT_DAU_DA?: OrNull<string>;
  NGAY_KT_DU_KIEN_DA?: OrNull<string>;
  NGAY_KET_THUC_DA?: OrNull<string>;
  GHI_CHU_DA?: OrNull<string>;
}
interface IDuAnDauViec {
  ID_DA_DV?: string;
  ID_DA?: OrNull<string>;
  ID_DVC?: OrNull<string>;
  NGAY_TAO_DA_DV?: string;
  NGAY_HT_DADV?: OrNull<string>;
  NGAY_HT_DK_DADV?: OrNull<string>;
  GHI_CHU_DADV?: OrNull<string>;
}
interface IDuAnPhongBan {
  ID_DA_PB?: string;
  ID_DA?: OrNull<string>;
  ID_PB?: OrNull<string>;
  NGAY_THAM_GIA_DA_PB?: string;
  NGAY_KET_THUC_DA_PB?: OrNull<string>;
  GHI_CHU_DA_PB?: OrNull<string>;
}
interface IDuyetNhanVien {
  ID_DNV?: string;
  ID_NV?: OrNull<string>;
  NHA_ID_NV__?: OrNull<string>;
  ID_NVPB?: OrNull<string>;
  NGAY_DE_XUAT_DNV?: OrNull<string>;
  NGAY_DUYET_DNV?: OrNull<string>;
}
interface IHuyen {
  ID_HUYEN?: string;
  ID_TINH?: OrNull<string>;
  CODE_HUYEN?: number;
  TEN_HUYEN?: string;
  GHI_CHU_HUYEN?: OrNull<string>;
}
interface IKhachHang {
  ID_KH?: string;
  TEN_KH?: OrNull<string>;
  DIA_CHI_KH?: OrNull<string>;
  DIEN_THOAI_KH?: OrNull<string>;
  FAX_KH?: OrNull<string>;
  EMAIL_KH?: OrNull<string>;
  GHI_CHU_KH?: OrNull<string>;
}
interface IKhachHangDuAn {
  ID_KH_DA?: string;
  ID_DA?: OrNull<string>;
  ID_KH?: OrNull<string>;
  KINH_PHI_KHDA?: number;
  NGAY_TAO_KH_DA?: string;
  NGAY_BAN_GIAO?: OrNull<string>;
  HUY_KHDA?: boolean;
  GHI_CHU_KHDA?: OrNull<string>;
}
interface ILichSuCongViec {
  ID_LSCV?: string;
  ID_CV?: string;
  NGAY_TAO_LSCV?: string;
  NOI_DUNG_LSCV?: string;
  GHI_CHU_LSCV?: OrNull<string>;
}
interface ILichSuDauViec {
  ID_LSDV?: string;
  ID_NVDV?: OrNull<string>;
  NGAY_TAO_LSDV?: OrNull<string>;
  NOI_DUNG_LSDV?: OrNull<string>;
  GHI_CHU_LSDV?: OrNull<string>;
}
interface IMucDoDanhGiaDauViec {
  ID_MDDGDV?: string;
  TEN_MDDDGV?: string;
  GHI_CHU_MDDDGDV?: OrNull<string>;
}
interface IMucDoDanhGiaNVDA {
  ID_MDDGNVDA?: string;
  TEN_MDDGNVDA?: string;
}
interface INguyenLieu {
  ID_NL?: string;
  TEN_NL?: string;
  SL_NL?: number;
  GHI_CHU_NL?: OrNull<string>;
  IS_ACTIVE_NL?: boolean;
}
interface INguyenLieuDonVi {
  ID_NL_DV?: string;
  ID_NL?: OrNull<string>;
  ID_DV?: OrNull<string>;
  IS_ACTIVE_NLDV?: boolean;
}
interface INhaCungCap {
  ID_NCC?: string;
  TEN_NCC?: string;
  DIEN_THOAI_NCC?: OrNull<string>;
  DIA_CHI_NCC?: OrNull<string>;
  GHI_CHU_NCC?: OrNull<string>;
  EMAIL_NCC?: OrNull<string>;
}
interface INhaCungCapCongCu {
  ID_NCCCC?: string;
  ID_NCC?: OrNull<string>;
  ID_CC?: OrNull<string>;
  GHI_CHU_NCCCC?: OrNull<string>;
}
interface INhaCungCapNguyenLieu {
  ID_NCCNL?: string;
  ID_NCC?: OrNull<string>;
  ID_NL?: OrNull<string>;
  GHI_CHU_NCCNL?: OrNull<string>;
}
interface INhaCungCapVatTu {
  ID_NCCVT?: string;
  ID_NCC?: OrNull<string>;
  ID_VT?: OrNull<string>;
  GHI_CHU_NCCVT?: OrNull<string>;
}
interface INhanVien {
  ID_NV?: string;
  ID_HUYEN?: OrNull<string>;
  ID_TP?: OrNull<string>;
  HO_TEN_NV?: OrNull<string>;
  DIA_CHI_NV?: OrNull<string>;
  DIEN_THOAI_NV?: OrNull<string>;
  GHI_CHU_NV?: OrNull<string>;
  GIOI_TINH_NV?: string;
  EMAIL_NV?: OrNull<string>;
  IS_ACTIVE_NV?: boolean;
}
interface INhanVienBangCap {
  ID_NVBC?: string;
  ID_BC?: OrNull<string>;
  ID_NV?: OrNull<string>;
  NGAY_CAP_NVBC?: OrNull<string>;
  GHI_CHU_NVBC?: OrNull<string>;
}
interface INhanVienChucVu {
  ID_NVCV?: string;
  ID_NV?: OrNull<string>;
  ID_CHV?: OrNull<string>;
  NGAY_BD_NVCV?: OrNull<string>;
  NGAY_KT_NVCV?: OrNull<string>;
  GHI_CHU_NVCV?: OrNull<string>;
}
interface INhanVienChungChi {
  ID_NV_CC?: string;
  ID_NV?: OrNull<string>;
  ID_CHCH?: OrNull<string>;
  NGAY_CAP_NVCC?: OrNull<string>;
  NGAY_HET_HAN_NVCC?: string;
  GHI_CHU_NVCC?: OrNull<string>;
}
interface INhanVienChuyenMon {
  ID_NVCM?: string;
  ID_NVPB?: OrNull<string>;
  ID_BC?: OrNull<string>;
  NGAY_BAT_DAU_NVCM?: string;
  NGAY_KEY_THUC_NVCM?: OrNull<string>;
  GHI_CHU_NVCM?: OrNull<string>;
}
interface INhanVienDauViec {
  ID_NVDV?: string;
  ID_NVDA?: OrNull<string>;
  ID_DA_DV?: OrNull<string>;
  GHI_CHU_NVDV?: OrNull<string>;
}
interface INhanVienDuAn {
  ID_NVDA?: string;
  NHA_ID_NHVDA__?: OrNull<string>;
  ID_DA?: OrNull<string>;
  ID_DNV?: OrNull<string>;
  ID_NV?: OrNull<string>;
  NGAY_BAT_DAU_NVDA?: string;
  NGAY_KET_THUC_NVDA?: OrNull<string>;
  GHI_CHU_NVDA?: OrNull<string>;
}
interface INhanVienPhongBan {
  ID_NVPB?: string;
  ID_NV?: OrNull<string>;
  ID_PB?: OrNull<string>;
  NHA_ID_NVPB__?: OrNull<string>;
  NGAY_BD_NVPB?: string;
  NGAY_KT_NVPB?: OrNull<string>;
  GHI_CHU_NVPB?: OrNull<string>;
}
interface INhanVienQuyenDauViec {
  ID_NVQDV?: string;
  ID_NVDV?: OrNull<string>;
  ID_QDV?: OrNull<string>;
  GHI_CHU_NVQDV?: OrNull<string>;
}
interface INhanVienQuyenDuAn {
  ID_NVQDA?: string;
  ID_QDA?: OrNull<string>;
  ID_NV?: OrNull<string>;
  GHI_CHU_NVQDA?: OrNull<string>;
}
interface IPhongBan {
  ID_PB?: string;
  TEN_PB?: OrNull<string>;
  DIEN_THOAI_PB?: OrNull<string>;
  GHI_CHU_PB?: OrNull<string>;
}
interface IQuyen {
  ID_QUYEN?: string;
  TEN_QUYEN?: string;
  GHI_CHU_QUYEN?: OrNull<string>;
}
interface IQuyenChucVu {
  ID_QCHV?: string;
  ID_NVCV?: OrNull<string>;
  ID_QUYEN?: OrNull<string>;
  GHI_CHU_QCHV?: OrNull<string>;
}
interface IQuyenDauViec {
  ID_QDV?: string;
  TEN_QDV?: string;
  GHI_CHU_QDV?: OrNull<string>;
}
interface IQuyenDuAn {
  ID_QDA?: string;
  TEN_QDA?: string;
  GHI_CHU_QDA?: OrNull<string>;
}
interface ISuKienDuAn {
  ID_SKDA?: string;
  ID_NVDA?: OrNull<string>;
  NHA_ID_NVDA__?: OrNull<string>;
  NGAY_TAO_SKDA?: string;
  NGAY_DUYET_SKDA?: OrNull<string>;
  NOI_DUNG_SKDA?: OrNull<string>;
  GHI_CHU_SKDA?: OrNull<string>;
}
interface ITaiKhoan {
  USERNAME?: string;
  PASSWORD?: string;
  IS_ACTIVE_TK?: boolean;
}
interface ITaiKhoanNhanVien {
  ID_TKNV?: string;
  ID_NV?: OrNull<string>;
  USERNAME?: OrNull<string>;
  NGAY_TAO_TKNV?: OrNull<string>;
}
interface IThanhPho {
  ID_TP?: string;
  ID_TINH?: OrNull<string>;
  CODE_TP?: string;
  TEN_TP?: string;
  GHI_CHU_TP?: OrNull<string>;
}
interface IThucHienDXDA {
  ID_THDXDA?: string;
  ID_DXDA?: OrNull<string>;
  ID_PB?: OrNull<string>;
  NGAY_THDXDA?: string;
  KINH_PHI?: string;
}
interface ITiLeQuyDoi {
  ID_TLQD?: string;
  ID_VTDV?: OrNull<string>;
  ID_NLDA?: OrNull<string>;
  VAT_ID_VTDV__?: OrNull<string>;
  ID_CCDV?: OrNull<string>;
  CON_ID_CCDV__?: OrNull<string>;
  NGU_ID_NLDV__?: OrNull<string>;
  TI_LE?: number;
  GHI_CHU_TLQD?: OrNull<string>;
}
interface ITinh {
  ID_TINH?: string;
  CODE_TINH?: string;
  TEN_TINH?: string;
  GHI_CHU_TINH?: OrNull<string>;
}
interface IVatTu {
  ID_VT?: string;
  TEN_VT?: string;
  SL_VT?: number;
  GHI_CHU_VT?: OrNull<string>;
  IS_ACTIVE_VT?: OrNull<string>;
}
interface IVatTuDonVi {
  ID_VTDV?: string;
  ID_VT?: OrNull<string>;
  ID_DV?: OrNull<string>;
  ID_ACTIVE_VTDV?: boolean;
}
