package com.helpinghands.service.impl;

import java.util.List;

import com.helpinghands.model.PasswordDto;
import com.helpinghands.util.Constants;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helpinghands.entity.UserEntity;
import com.helpinghands.model.AppUsersDto;
import com.helpinghands.repository.UserRepository;
import com.helpinghands.service.UserService;
import com.helpinghands.util.EntityManager;
import com.helpinghands.util.MessageConstants.ErrorMessages;
import com.helpinghands.exceptions.UserException;

/**
 * 
 *
 * @version 1.0
 * 
 */
@Service
public class UserServiceImpl implements UserService {

	/**
	 * Dependency injection
	 */
	@Autowired
	private UserRepository userRepository;
	
	/**
	 * Retrieve all the users within the repository
	 */
	public List<UserEntity> getAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}


	/**
	 * Retrieve the user details for the user that has the specified username
	 */
	public UserEntity getUserDetails(String username) {
		// TODO Auto-generated method stub
		UserEntity dbUserEntity = userRepository.findByUsernameIgnoreCase(username);
		if(dbUserEntity == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		return dbUserEntity;
	}

	/**
	 * Create a user with the details as specified within the DTO
	 */
	public void insertUser(AppUsersDto user) {
		// TODO Auto-generated method stub
		String[] emailParts = user.getEmail().split("@");
		String username = user.getEmail();
		if(emailParts != null){
			username = emailParts[0];
		}
		UserEntity dbUserEntity = userRepository.findByUsernameIgnoreCase(username);
		if(dbUserEntity != null) {
			throw new UserException(ErrorMessages.USER_ALREADY_EXISTS);
		}
		dbUserEntity = EntityManager.transformUserDTO(user);
		dbUserEntity.setPassword(BCrypt.hashpw(dbUserEntity.getPassword(), BCrypt.gensalt()));
		dbUserEntity.setRole(Constants.Normal);
		userRepository.save(dbUserEntity);
	}

	/**
	 * Update a user with the details as specified within the DTO
	 */
	public void updateUser(AppUsersDto user) {
		// TODO Auto-generated method stub
		String[] emailParts = user.getEmail().split("@");
		String username = user.getEmail();
		if(emailParts != null){
			username = emailParts[0];
		}
		UserEntity dbUserEntity = userRepository.findByUsernameIgnoreCase(username);
		if(dbUserEntity == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		UserEntity newUserDetailsEntity = EntityManager.transformUserDTO(user);
		String newName = newUserDetailsEntity.getUsername();
		String newEmail = newUserDetailsEntity.getEmail();
		if(newName != null && !newName.isEmpty()) {
			dbUserEntity.setUsername(newName);
		}
		if(newEmail != null && !newEmail.isEmpty()) {
			dbUserEntity.setEmail(newEmail);
		}

		userRepository.save(dbUserEntity);
	}

	/**
	 * Delete the user with the specified username
	 */
	public void deleteUser(String username) {
		// TODO Auto-generated method stub
		UserEntity dbUserEntity = userRepository.findByUsernameIgnoreCase(username);
		if(dbUserEntity == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		userRepository.delete(dbUserEntity);
	}

	/**
	 * Change the password for the user with the details as specified within the DTO
	 */
	public Boolean changePassword(PasswordDto passwordDetails) {
		// TODO Auto-generated method stub
		String[] emailParts = passwordDetails.getEmail().split("@");
		String username = passwordDetails.getEmail();
		if(emailParts != null){
			username = emailParts[0];
		}
		UserEntity dbUserEntity = userRepository.findByUsernameIgnoreCase(username);
		if(dbUserEntity == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		if(BCrypt.checkpw(passwordDetails.getOldPassword(), dbUserEntity.getPassword())) {
			dbUserEntity.setPassword(BCrypt.hashpw(passwordDetails.getNewPassword(), BCrypt.gensalt()));
			userRepository.save(dbUserEntity);
			return true;
		}
		return false;
	}

}
