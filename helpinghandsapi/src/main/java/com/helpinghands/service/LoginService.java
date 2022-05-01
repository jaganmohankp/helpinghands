package com.helpinghands.service;

import com.helpinghands.entity.User;
import com.helpinghands.model.LoginRequestDto;
import com.helpinghands.entity.ResetToken;
import com.helpinghands.model.AppUsersDto;

public interface LoginService {

	User authenticate(final LoginRequestDto loginDetails);

	void resetPassword(final AppUsersDto user) throws Exception;
	
	void changeForgottenPassword(final ResetToken token) throws Exception;
	
}
