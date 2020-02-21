package org.uah.mmaa.config.security.login;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


public class LoginRequest extends UsernamePasswordAuthenticationToken
{
    private static final long serialVersionUID = 1L;

    private String email;

    private String password;

    public LoginRequest(Object principal, Object credentials)
    {
        super(principal, credentials);
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }
}
