package com.helpinghands.service.impl;

import java.net.URL;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.apache.commons.lang3.RandomStringUtils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helpinghands.model.LoginRequestDto;
import com.helpinghands.entity.ResetTokenEntity;
import com.helpinghands.repository.ResetTokenRepository;
import com.helpinghands.service.LoginService;
import com.helpinghands.model.AppUsersDto;
import com.helpinghands.entity.UserEntity;
import com.helpinghands.repository.UserRepository;
import com.helpinghands.util.AutomatedEmailer;
import com.helpinghands.util.MessageConstants.EmailMessages;
import com.helpinghands.util.MessageConstants.ErrorMessages;
import com.helpinghands.exceptions.InvalidLoginException;
import com.helpinghands.exceptions.InvalidTokenException;
import com.helpinghands.exceptions.UserException;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ResetTokenRepository resetRepository;
	
	@Autowired
	private ServletContext servletContext;
	
	private static final String HOST_ADDRESS = "xxxxxxxxxxxxxxxxxx";
	
	@Override
	public UserEntity authenticate(LoginRequestDto loginDetails) {
		// TODO Auto-generated method stub
		UserEntity dbUserEntity = userRepository.findByUsernameIgnoreCase(loginDetails.getUsername());
		if(dbUserEntity == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		if(!BCrypt.checkpw(loginDetails.getPassword(), dbUserEntity.getPassword())) {
			throw new InvalidLoginException(ErrorMessages.INVALID_CREDENTIALS);
		}
		return dbUserEntity;
	}

	@Override
	public void resetPassword(AppUsersDto user) throws Exception {
		// TODO Auto-generated method stub
		UserEntity dbUserEntity = userRepository.findByEmailIgnoreCase(user.getEmail());
		if(dbUserEntity == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER_EMAIL);
		}
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MINUTE, 30);
		UUID uuid = UUID.randomUUID();
		// servletContext.getContextPath() + 
		URL url = new URL("http://" + HOST_ADDRESS + "/reset-password/" + uuid.toString());
		ResetTokenEntity resetRequest = new ResetTokenEntity(dbUserEntity.getUsername(), uuid.toString(), calendar.getTime());
		resetRepository.save(resetRequest);
		new AutomatedEmailer(user.getEmail(), EmailMessages.RESET_PASSWORD_SUBJECT, EmailMessages.FORGOT_PASSWORD_STARTER 
				+ dbUserEntity.getUsername().toUpperCase() + EmailMessages.FORGOT_PASSWORD_MESSAGE + url.toString());
	}
	
	@Override
	public void changeForgottenPassword(ResetTokenEntity token) throws Exception {
		ResetTokenEntity resetRequest = resetRepository.findByToken(token.getToken());
		if(resetRequest == null) {
			throw new InvalidTokenException(ErrorMessages.INCORRECT_RESET_TOKEN);
		}
		Date expirationDate = resetRequest.getExpirationDate();
		if(expirationDate.after(new Date())) {
			UserEntity dbUserEntity = userRepository.findByUsernameIgnoreCase(resetRequest.getUsername());
			String newPassword = RandomStringUtils.random(8, true, true).toUpperCase();
			new AutomatedEmailer(dbUserEntity.getEmail(), EmailMessages.RESET_PASSWORD_SUBJECT, EmailMessages.RESET_PASSWORD_MESSAGE1 + newPassword + EmailMessages.RESET_PASSWORD_MESSAGE2);
			dbUserEntity.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
			userRepository.save(dbUserEntity);
			resetRepository.delete(resetRequest);
		} else {
			throw new InvalidTokenException(ErrorMessages.EXPIRED_TOKEN);
		}
	}
	
}
