import request from '@/utils/request'

export const ShowSystemMaster = params => {
  return request({
    url: '/master/show_system_master',
    method: 'get',
    params,
  })
}

export const GetAllSystemMaster = () => {
  return request({
    url: '/master/get_all',
    method: 'get',
  })
}

export const AddSystemMaster = params => {
  return request({
    url: '/master/create_system_master',
    method: 'post',
    params,
  })
}

export const EditSystemMaster = params => {
  return request({
    url: '/master/edit_system_master',
    method: 'put',
    params,
  })
}

export const EditStatusSystemMaster = params => {
  return request({
    url: '/master/edit_status',
    method: 'put',
    params,
  })
}

export const ResetPasswordSystemMaster = params => {
  return request({
    url: '/master/reset_password',
    method: 'put',
    params,
  })
}

export const UnlockSystemMaster = params => {
  return request({
    url: '/master/unlock_system_master',
    method: 'put',
    params,
  })
}

export const ShowAuthPermission = params => {
  return request({
    url: '/master/auth/show_permission',
    method: 'get',
    params,
  })
}

export const GetAuthFirstPermission = () => {
  return request({
    url: '/master/auth/show_first_permission',
    method: 'get',
  })
}

export const AddAuthPermission = params => {
  return request({
    url: '/master/auth/add_permission',
    method: 'post',
    params,
  })
}

export const EditAuthPermission = params => {
  return request({
    url: '/master/auth/edit_permission',
    method: 'put',
    params,
  })
}

export const EditAuthStatusPermission = params => {
  return request({
    url: '/master/auth/edit_status_permission',
    method: 'put',
    params,
  })
}

export const ShowAuthRole = params => {
  return request({
    url: '/master/auth/show_role',
    method: 'get',
    params,
  })
}

export const GetAuthRole = () => {
  return request({
    url: '/master/auth/get_role',
    method: 'get',
  })
}

export const AddAuthRole = params => {
  return request({
    url: '/master/auth/add_role',
    method: 'post',
    params,
  })
}

export const EditAuthRole = params => {
  return request({
    url: '/master/auth/edit_role',
    method: 'put',
    params,
  })
}

export const ShowAuthRoleRelation = params => {
  return request({
    url: '/master/auth/show_role_relation',
    method: 'get',
    params,
  })
}

export const AddAuthRoleRelation = params => {
  return request({
    url: '/master/auth/add_role_relation',
    method: 'post',
    params,
  })
}


export const EditAuthRoleRelation = params => {
  return request({
    url: '/master/auth/edit_role_relation',
    method: 'put',
    params,
  })
}

export const ShowEditAuthRoleRelation = params => {
  return request({
    url: 'master/auth/show_permission_relation',
    method: 'get',
    params,
  })
}

export const EditAuthRolePermissionRelation = params => {
  return request({
    url: '/master/auth/edit_permission_relation',
    method: 'put',
    params,
  })
}

export const ShowAuthPermissionExclude = params => {
  return request({
    url: '/master/auth/show_permission_exclude',
    method: 'get',
    params,
  })
}

export const AddAuthPermissionExclude = params => {
  return request({
    url: '/master/auth/add_permission_exclude',
    method: 'post',
    params,
  })
}

export const EditAuthPermissionExclude = params => {
  return request({
    url: '/master/auth/edit_permission_exclude',
    method: 'put',
    params,
  })
}

export const DelAuthPermissionExclude = params => {
  return request({
    url: '/master/auth/delete_permission_exclude',
    method: 'delete',
    params,
  })
}
