export const StatePropose = {
	Approve: 'Đã duyệt',
	Reject: 'Từ chối',
	Pending: 'Đợi duyệt',
} as const;

export const LocalKeys = {
	accessToken: 'accessToken',
} as const;

export const Role = {
	TRUONG_PHONG: 'TRUONG_PHONG',
	QUAN_LY_TRUONG_PHONG: 'QUAN_LY_TRUONG_PHONG',
	NHAN_VIEN: 'NHAN_VIEN',
	ALL: 'ALL',
};

export const WorkState = {
	Planing: 'Lên kế hoạch',
	Processing: 'Đang thực hiện',
	Canceled: 'Huỷ bỏ',
	Done: 'Hoàn thành',
};

export const SupportLangs = ['en', 'vi'];
