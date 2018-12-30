package main.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${jwt.expires_in}")
    private int EXPIRES_IN;

    private TokenHelper tokenHelper;

    private ObjectMapper objectMapper;

    public AuthenticationSuccessHandler(TokenHelper tokenHelper, ObjectMapper objectMapper) {
        this.tokenHelper = tokenHelper;
        this.objectMapper = objectMapper;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ){

        clearAuthenticationAttributes(request);
        User user = (User)authentication.getPrincipal();
        String jwt = tokenHelper.generateToken( user.getUsername() );
        System.out.println("Generating token: " + jwt);
        UserTokenState userTokenState = new UserTokenState(jwt, EXPIRES_IN);
        userTokenState.setUsername(user.getUsername());
        userTokenState.setRoles(user.getAuthorities());
        try {
            String jwtResponse = objectMapper.writeValueAsString(userTokenState);
            response.setContentType("application/json");
            response.getWriter().write(jwtResponse);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    private class UserTokenState{
        private String jws;
        private int expires;
        private String username;
        private Collection<? extends GrantedAuthority> roles;

        public UserTokenState(String jws, int expires){
            this.jws = jws;
            this.expires = expires;
        }

        public String getJws() {
            return jws;
        }

        public void setJws(String jws) {
            this.jws = jws;
        }

        public int getExpires() {
            return expires;
        }

        public void setExpires(int expire) {
            this.expires = expire;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public Collection<? extends GrantedAuthority> getRoles() {
            return roles;
        }

        public void setRoles(Collection<? extends GrantedAuthority> roles) {
            this.roles = roles;
        }
    }
}