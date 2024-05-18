package com.anil.securityproxy;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

import com.filenet.api.collection.AccessPermissionList;
import com.filenet.api.constants.PermissionSource;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.CustomObject;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.engine.EventActionHandler;
import com.filenet.api.events.ObjectChangeEvent;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.property.Properties;
import com.filenet.api.security.AccessPermission;
import com.filenet.api.util.Id;

public class SecurityProxyCodeModule implements EventActionHandler {

	@Override
	public void onEvent(ObjectChangeEvent triggeredEvent, Id subscriptionId) throws EngineRuntimeException {
		// TODO Auto-generated method stub
		System.out.println("Inside of Security Proxy Event Action");

		Id id = null;
		ObjectStore os = null;
		System.out.println("Event: " + triggeredEvent.getClassName());
		System.out.println("subscriptionId " + subscriptionId.toString());
		try {
			os = triggeredEvent.getObjectStore();
			System.out.println("Object Store : " + os);
			id = triggeredEvent.get_SourceObjectId();
			System.out.println("Document Id " + id.toString());

			securityUpdate(id, os);

			System.out.println("End of Security Proxy Event Action");

		} catch (EngineRuntimeException e) {
			// TODO: handle exception
			System.out.println("Exception occurred while updating the document security : " + e.getMessage());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception occurred : " + e.getMessage());
		}

	}

	public static void securityUpdate( Id id,ObjectStore os) {
		// TODO Auto-generated method stub
		Properties props=null;
		Document doc=null;
		try {
			doc=Factory.Document.fetchInstance(os, id, null);
			props=doc.getProperties();
			// if we want any property value check we can do that for now doing without check for all documents
			deleteExistingSecurity(doc);
			String proxyId="";
			updateSecProxy(proxyId,os,doc);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception occurred : " + e.getMessage());
		}
		
	}

	private static void updateSecProxy(String proxyId, ObjectStore os, Document doc) {
		// TODO Auto-generated method stub
		Properties props=null;
		try {
			System.out.println("Inside update security proxy method");
			CustomObject proxyRef=fetchProxyRef(proxyId,os);
			
			props=doc.getProperties();
			//get the proxy template symbolic for eg> SecurityProxy
			props.putObjectValue("SecurityProxy", proxyRef.getObjectReference());
			doc.save(RefreshMode.NO_REFRESH);
			System.out.println("Security Updated Successfully");
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception occurred while updating the security proxy: " + e.getMessage());
		}
		
	}

	public static CustomObject fetchProxyRef(String proxyId, ObjectStore os) {
		// TODO Auto-generated method stub
		System.out.println("Inside Fetch Proxy");
		CustomObject co=Factory.CustomObject.fetchInstance(os, new Id(proxyId), null);
		return co;
	}

	private static void deleteExistingSecurity(Document doc) {
		// TODO Auto-generated method stub
		boolean isSecurityUpdated=false;
		AccessPermissionList apl=doc.get_Permissions();
		Iterator<AccessPermission> it=apl.iterator();
		Collection<AccessPermission> apc=new ArrayList<>();
		
		while(it.hasNext()){
			AccessPermission ap=it.next();
			if(ap.get_PermissionSource().getValue() == PermissionSource.SOURCE_DEFAULT_AS_INT ||
					ap.get_PermissionSource().getValue() == PermissionSource.SOURCE_DIRECT_AS_INT || 
					ap.get_PermissionSource().getValue() == PermissionSource.SOURCE_TEMPLATE_AS_INT){
				
				apc.add(ap);
				if(!isSecurityUpdated){
					isSecurityUpdated=true;
					System.out.println("is Security Updated variable is true");
				}
			}
		}
		if(isSecurityUpdated){
		apl.removeAll(apc);
		doc.save(RefreshMode.REFRESH);
		System.out.println( "Removed Existing Security");
		}
		
	}

}
