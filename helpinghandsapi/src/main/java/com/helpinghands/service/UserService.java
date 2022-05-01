package com.helpinghands.service;

import java.util.List;

import com.helpinghands.model.PasswordDto;
import com.helpinghands.model.AppUsersDto;
import com.helpinghands.entity.User;

/**
 * 
 *
 * @version 1.0
 *
 */
public interface UserService {
	
	/**
	 * 
	 * @return All the users that are found within the repository
	 */
	List<User> getAllUsers();

	/**
	 * 
	 * @param username
	 * @return The user details for the user that have the specified username within the repository
	 */
	User getUserDetails(final String username);
	
	/**
	 * Create a user with the details as specified by the user DTO
	 * @param user
	 */
	void insertUser(final AppUsersDto user);
	
	/**
	 * Update the user with the details as specified by the user DTO
	 * @param user
	 */
	void updateUser(final AppUsersDto user);
	
	/**
	 * Delete the user with the specified username
	 * @param username
	 */
	void deleteUser(final String username);
	
	/**
	 * Change the password for the specified user
	 * @param passwordDetails
	 * @return Boolean value: True for successful password change, False otherwise
	 */
	Boolean changePassword(final PasswordDto passwordDetails);

}
