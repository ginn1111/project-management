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
