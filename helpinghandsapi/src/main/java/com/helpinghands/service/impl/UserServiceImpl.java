package com.helpinghands.service.impl;

import java.util.List;

import com.helpinghands.model.PasswordDto;
import com.helpinghands.util.Constants;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helpinghands.entity.User;
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
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}


	/**
	 * Retrieve the user details for the user that has the specified username
	 */
	public User getUserDetails(String username) {
		// TODO Auto-generated method stub
		User dbUser = userRepository.findByUsernameIgnoreCase(username);
		if(dbUser == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		return dbUser;
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
		User dbUser = userRepository.findByUsernameIgnoreCase(username);
		if(dbUser != null) {
			throw new UserException(ErrorMessages.USER_ALREADY_EXISTS);
		}
		dbUser = EntityManager.transformUserDTO(user);
		dbUser.setPassword(BCrypt.hashpw(dbUser.getPassword(), BCrypt.gensalt()));
		dbUser.setRole(Constants.Normal);
		userRepository.save(dbUser);
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
		User dbUser = userRepository.findByUsernameIgnoreCase(username);
		if(dbUser == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		User newUserDetails = EntityManager.transformUserDTO(user);
		String newName = newUserDetails.getUsername();
		String newEmail = newUserDetails.getEmail();
		if(newName != null && !newName.isEmpty()) {
			dbUser.setUsername(newName);
		}
		if(newEmail != null && !newEmail.isEmpty()) {
			dbUser.setEmail(newEmail);
		}

		userRepository.save(dbUser);
	}

	/**
	 * Delete the user with the specified username
	 */
	public void deleteUser(String username) {
		// TODO Auto-generated method stub
		User dbUser = userRepository.findByUsernameIgnoreCase(username);
		if(dbUser == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		userRepository.delete(dbUser);
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
		User dbUser = userRepository.findByUsernameIgnoreCase(username);
		if(dbUser == null) {
			throw new UserException(ErrorMessages.NO_SUCH_USER);
		}
		if(BCrypt.checkpw(passwordDetails.getOldPassword(), dbUser.getPassword())) {
			dbUser.setPassword(BCrypt.hashpw(passwordDetails.getNewPassword(), BCrypt.gensalt()));
			userRepository.save(dbUser);
			return true;
		}
		return false;
	}

}
