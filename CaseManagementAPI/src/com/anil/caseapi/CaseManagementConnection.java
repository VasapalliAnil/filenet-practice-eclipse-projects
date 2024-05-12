package com.anil.caseapi;
import java.util.List;
import java.util.Locale;

import javax.security.auth.Subject;

import com.filenet.api.core.Connection;
import com.filenet.api.core.Domain;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.UserContext;
import com.ibm.casemgmt.api.Case;
import com.ibm.casemgmt.api.CaseType;
import com.ibm.casemgmt.api.DeployedSolution;
import com.ibm.casemgmt.api.context.CaseMgmtContext;
import com.ibm.casemgmt.api.context.P8ConnectionCache;
import com.ibm.casemgmt.api.context.SimpleP8ConnectionCache;
import com.ibm.casemgmt.api.context.SimpleVWSessionCache;
import com.ibm.casemgmt.api.objectref.ObjectStoreReference;

public class CaseManagementConnection {
	public static Connection conn=null;
	public static ObjectStore os=null;
	public static CaseMgmtContext origCmctx=null;
	public static Locale origLocale =null;
	public static UserContext uc=null;
	public static void getConnection(String CE_URI,String USER_NAME,String PASSWORD){
		P8ConnectionCache connCache = new SimpleP8ConnectionCache();
	     conn = connCache.getP8Connection(CE_URI);
	    Subject subject = 
	        UserContext.createSubject(conn, USER_NAME, 
	                                  PASSWORD, "FileNetP8WSI");
	     uc = UserContext.get();
	    uc.pushSubject(subject);
	     origLocale = uc.getLocale();
	    uc.setLocale(origLocale);
	     origCmctx = 
	        CaseMgmtContext.set(
	            new CaseMgmtContext(
	                new SimpleVWSessionCache(), connCache
	            )
	        );
	    try {
	       
            
	        
	    }
	    finally{
	    
	    }
	    
	}
	
	public static void closeConnection(){
		CaseMgmtContext.set(origCmctx);
        uc.setLocale(origLocale);
        uc.popSubject();
	}
}
