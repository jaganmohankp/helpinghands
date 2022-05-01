package com.helpinghands.model;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PasswordDto {

	@NotNull
	@JsonProperty
	private String email;

	@NotNull
	@JsonProperty
	private String oldPassword;
	
	@NotNull
	@JsonProperty
	private String newPassword;

	protected PasswordDto() {}
	
	public PasswordDto(String email, String oldPassword, String newPassword) {
		this.email = email;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
}
