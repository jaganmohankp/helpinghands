package com.helpinghands.exceptions;

public class UserException extends RuntimeException {

	/**
	 * Auto-Generated by Compiler
	 */
	private static final long serialVersionUID = -6293114454977664070L;
	
	public UserException(final String message) {
		super(message);
	}
	
	public UserException(final String message, final Throwable throwable) {
		super(message, throwable);
	}

}
