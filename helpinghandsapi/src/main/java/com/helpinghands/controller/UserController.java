package com.helpinghands.controller;

import com.helpinghands.model.*;
import com.helpinghands.security.JwtGenerator;
import com.helpinghands.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.helpinghands.entity.UserEntity;
import com.helpinghands.service.UserService;
import com.helpinghands.service.LoginService;
import com.helpinghands.util.MessageConstants;
import com.helpinghands.util.ResponseDTO;
import com.helpinghands.util.MessageConstants.ErrorMessages;

/**
 * 
 *
 * @version 1.0
 * 
 */
@RestController
@CrossOrigin
public class UserController {
	
	/**
	 * Dependency injection
	 */
	@Autowired
	private UserService userService;

	@Autowired
	private LoginService loginService;

	@Autowired
	private JwtGenerator jwtGenerator;


	/**
	 * REST API exposed to create a new user
	 * @param user
	 * @return ResponseDTO with the status specifying if the operation was successful
	 */
	@PostMapping("/userauth/mysignup")
	public ResponseDTO signupUser(@RequestBody AppUsersDto user) {
		ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, null, MessageConstants.USER_ADD_SUCCESS);
		try {
			userService.insertUser(user);
		} catch (Exception e) {
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
			responseDTO.setMessage(e.getMessage());
		}
		return responseDTO;
	}

	@PostMapping("/userauth/mylogin")
	public LoginResponseDto authenticateUser(@RequestBody LoginRequestDto login) {
		LoginResponseDto loginResponseDTO = new LoginResponseDto(MessageConstants.LOGIN_SUCCESS);
		try {
			UserEntity userEntity = loginService.authenticate(login);
			String token = jwtGenerator.generateToken(login, userEntity.getRole());

			LoginResponseData data = new LoginResponseData();
			data.setId(String.valueOf(userEntity.getUserId()));
			data.setUsername(userEntity.getUsername());
			data.setEmail(userEntity.getEmail());
			data.setToken(token);
			data.setDate(DateUtil.getCurrentDateTime());
		} catch (Exception e) {
			loginResponseDTO.setMessage(MessageConstants.LOGIN_FAIL);
			loginResponseDTO.setMessage(e.getMessage());
		}
		return loginResponseDTO;
	}

	/**
	 * REST API exposed to retrieve the user details of the user with the specified username
	 * @param username
	 * @return ResponseDTO with the result being the User with the specified username
	 */
	@GetMapping("/userauth/myprofile")
	public ResponseDTO getUserDetails(@RequestParam(value = "username", required = true) String username) {
		UserEntity result = null;
		ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, null, MessageConstants.USER_RETRIEVE_SUCCESS);
		try {
			result = userService.getUserDetails(username);
		} catch ( Exception e) {
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
			responseDTO.setMessage(e.getMessage());
		}
		responseDTO.setResult(result);
		return responseDTO;
	}
	

	
	/**
	 * REST API exposed for ADMIN_USERS to update users
	 * @param user
	 * @return ResponseDTO with the status specifying if the operation was successful
	 */
	@PostMapping("/userauth/updateuser")
	public ResponseDTO updateUser(@RequestBody AppUsersDto user) {
		ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, null, MessageConstants.USER_UPDATE_SUCCESS);
		try {
			userService.updateUser(user);
		} catch (Exception e) {
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
			responseDTO.setMessage(e.getMessage());
		}
		return responseDTO;
	}
	
	/**
	 * REST API exposed for all authenticated users to change their password
	 * @param passwordDetails
	 * @return ResponseDTO with the result indicating whether the password change was successful
	 */
	@PostMapping("/userauth/myreset")
	public ResponseDTO changePassword(@RequestBody PasswordDto passwordDetails) {
		Boolean result = null;
		ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, result, MessageConstants.PASSWORD_CHANGE_SUCCESS);
		try {
			result = userService.changePassword(passwordDetails);
		} catch (Exception e) {
			responseDTO.setMessage(e.getMessage());
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
		}
		if(result == false) {
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
			responseDTO.setMessage(ErrorMessages.PASSWORD_NOT_UPDATED);
		}
		return responseDTO;
	}
	
	/**
	 * REST API exposed for ADMIN_USERS to delete the user with the specified username
	 * @param username
	 * @return ResponseDTO with the result specifying if the operation was successful
	 */
	@DeleteMapping("/userauth/deleteUser")
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseDTO deleteUser(@RequestParam(value = "username", required = true) String username) {
		ResponseDTO responseDTO = new ResponseDTO(ResponseDTO.Status.SUCCESS, null, MessageConstants.USER_DELETE_SUCCESS);
		try {
			userService.deleteUser(username);
		} catch (Exception e) {
			responseDTO.setStatus(ResponseDTO.Status.FAIL);
			responseDTO.setMessage(e.getMessage());
		}
		return responseDTO;
	}

}
