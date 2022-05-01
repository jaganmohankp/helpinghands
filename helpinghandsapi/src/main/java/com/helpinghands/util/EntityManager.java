package com.helpinghands.util;


import com.helpinghands.model.AppUsersDto;
import com.helpinghands.entity.User;

/**
 * 
 *
 * @version 1.0
 * 
 */
public class EntityManager {
	
	/**
	 * 
	 *
	 * @version 1.0
	 * 
	 */
	public enum DTOKey {
		AppusersDto
	}
	
	/**
	 * Data transformation from a DTO to an Entity class
	 * @param userDto
	 * @return A User object with the parameters as specified within the DTO
	 */
	public static User transformUserDTO(AppUsersDto userDto) {

		String username = userDto.getUserName();
		String password = userDto.getPassword();
		String usertype = "Normal";
		String email = userDto.getEmail();
		return new User(username, password, usertype, email);
	}
	

	

	
	/**
	 * Helper method that evaluates if there is an intent to update specific fields within the conversion process
	 * @param object
	 * @return Boolean value: True if the intent exists, False otherwise
	 */
	public static Boolean checkForUpdateIntent(Object object) {
		return object == null ? Boolean.FALSE : Boolean.TRUE;
	}

}
