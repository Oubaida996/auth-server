# auth-server
We will now be using that Token to re-authenticate users to shield access to any route that requires a valid login to access.  


# Heroku link  
[Heroku link](https://obieda-auth-server.herokuapp.com/users)

# PR
[PR](https://github.com/Oubaida996/auth-server/pull/3)  

# Actions
[Action](https://github.com/Oubaida996/auth-server/actions)

/users get request    
 
{  

"id": 1,  

"userName": "mohamad",  

"pwd": "$2b$05$V1rpmgyvvmTpVgxvOp2myOwmDW97I8ziWp/yFdVFOKHCITutjS97K",  

"createdAt": "2022-03-09T13:56:46.954Z",  

"updatedAt": "2022-03-09T13:56:46.954Z"  


}

    


  /signUp  post request  

{  

    "userName": "test",
    "pwd": "test"  

} 


  /signIn  post request    (basic auth )  

{  

    user name :........  
    password  :........  


}

  /secretstuff  get request    (bearer auth )  

{  

    token : ...................  

}  

![UML](./assets/auth-server-uml.jpg)  
