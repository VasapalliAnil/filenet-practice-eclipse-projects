package com.anil.ceapi;

import javax.security.auth.Subject;

import com.filenet.api.core.Connection;
import com.filenet.api.core.Domain;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.UserContext;

public class CEConnection {
	public static Connection conn=null;
	
	public static Connection getCEConnection(String CE_URI,String USER_NAME,String PASSWORD){
		
		 conn=Factory.Connection.getConnection(CE_URI);
		Subject uc=UserContext.createSubject(conn, USER_NAME, PASSWORD, "FileNetP8");
		UserContext.get().pushSubject(uc);
		return conn;
		
	}
	
	

	public static ObjectStore getObjectStore(Connection conn,String os) {
		Domain domain = Factory.Domain.fetchInstance(conn, null, null);
		ObjectStore objectStore = Factory.ObjectStore.fetchInstance(domain, os, null);
		return objectStore;
	}
	
	
	public void closeCEConnection(){
		if(conn != null){
			UserContext.get().popSubject();
		}
	}
}
