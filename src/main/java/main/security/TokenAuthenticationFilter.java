package main.security;

import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.header}")
    private String AUTH_HEADER;

    @Autowired
    TokenHelper tokenHelper;

    @Autowired
    UserDetailsService userDetailServiceImpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String error = "";
        String authToken = request.getHeader(AUTH_HEADER);

        if (authToken != null) {
           System.out.println("Checking authentication for token " + authToken);
            // Get username from token
            String username = tokenHelper.getUsernameFromToken( authToken );
            if ( username != null ) {

                // Get user
                UserDetails userDetails = userDetailServiceImpl.loadUserByUsername( username );

                // Create authentication
                TokenBasedAuthentication authentication = new TokenBasedAuthentication( userDetails );
                authentication.setToken( authToken );
                SecurityContextHolder.getContext().setAuthentication( authentication );
            } else {
                error = "Username from token can't be found in DB.";
            }
        }

        if( ! error.equals("")){
            System.out.println(error);
            SecurityContextHolder.getContext().setAuthentication( new AnonAuthentication() );//prevent show login form...
        }
        chain.doFilter(request, response);
    }
}
