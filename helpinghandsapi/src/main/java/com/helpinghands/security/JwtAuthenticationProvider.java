package com.helpinghands.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.helpinghands.entity.UserEntity;
import com.helpinghands.util.MessageConstants.ErrorMessages;
import com.helpinghands.exceptions.InvalidTokenException;

@Component
public class JwtAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
 
	@Autowired
	private JwtValidator validator;
	
	@Override
	public boolean supports(Class<?> aClass) {
		// TODO Auto-generated method stub
		return JwtAuthenticationToken.class.isAssignableFrom(aClass);
	}

	@Override
	protected void additionalAuthenticationChecks(UserDetails arg0, UsernamePasswordAuthenticationToken arg1)
			throws AuthenticationException {
		// TODO Auto-generated method stub
	}

	@Override
	protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {
		// TODO Auto-generated method stub
		JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken)usernamePasswordAuthenticationToken;
		String token = jwtAuthenticationToken.getToken();
		/*
		JwtUser jwtUser = validator.validate(token);
		if(jwtUser == null) {
			throw new UserException("JWT Token is incorrect");
		}
		*/
		UserEntity userEntity = validator.validateUser(token);
		if(userEntity == null) {
			throw new InvalidTokenException(ErrorMessages.INCORRECT_TOKEN);
		}
		//List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(jwtUser.getRole());
		//List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(user.getRoles().get(0).getRoleName());
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(userEntity.getRole());
		return new JwtUserDetails(userEntity.getUsername(), userEntity.getUserId(), token, grantedAuthorities);
	}

}
