/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  code: number;
  data: {
    token: string;
  };
  message: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  id: number;
  account_id: number;
  name: string;
  tel: string;
  uc_account: {
    id: number;
    username: string;
    real_name_type: number;
    status: number;
    created_at: string;
    updated_at: string;
  };
}
