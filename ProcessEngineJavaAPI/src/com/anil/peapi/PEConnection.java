package com.anil.peapi;

import javax.security.auth.Subject;

import com.filenet.api.core.Connection;
import com.filenet.api.core.Factory;
import com.filenet.api.util.UserContext;

import filenet.vw.api.VWSession;

public class PEConnection {
	public static Connection conn=null;
	
	public static Connection getCEConnection(String CE_URI,String USER_NAME,String PASSWORD){
		//we can use this or wcmapicocnfig 
		//System.setProperty("filenet.pe.bootstrap.ceuri", CE_URI);
		Connection conn=Factory.Connection.getConnection(CE_URI);
		Subject uc=UserContext.createSubject(conn, USER_NAME, PASSWORD, "FileNetP8");
		UserContext.get().pushSubject(uc);
		return conn;
		
	}
	public static VWSession getVWSession(String CE_URI,String USER_NAME,String PASSWORD,String connectionPoint){
		getCEConnection(CE_URI,USER_NAME,PASSWORD);
		VWSession vw=new VWSession(USER_NAME,PASSWORD,connectionPoint);
		return vw;
	}
	
	public void closeCEConnection(){
		if(conn != null){
			UserContext.get().popSubject();
		}
	}
}
