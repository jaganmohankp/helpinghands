package com.helpinghands.service;

import com.helpinghands.entity.UserEntity;
import com.helpinghands.model.LoginRequestDto;
import com.helpinghands.entity.ResetTokenEntity;
import com.helpinghands.model.AppUsersDto;

public interface LoginService {

	UserEntity authenticate(final LoginRequestDto loginDetails);

	void resetPassword(final AppUsersDto user) throws Exception;
	
	void changeForgottenPassword(final ResetTokenEntity token) throws Exception;
	
}
