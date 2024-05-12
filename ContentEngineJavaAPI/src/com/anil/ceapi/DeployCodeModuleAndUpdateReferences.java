package com.anil.ceapi;


import java.io.File;
import java.io.FileInputStream;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import com.filenet.api.admin.CodeModule;
import com.filenet.api.collection.ActionSet;
import com.filenet.api.collection.ContentElementList;
import com.filenet.api.constants.AutoClassify;
import com.filenet.api.constants.CheckinType;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.constants.ReservationType;
import com.filenet.api.core.ContentTransfer;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.core.VersionSeries;
import com.filenet.api.events.Action;
import com.filenet.api.property.PropertyFilter;
import com.filenet.api.util.Id;

public class DeployCodeModuleAndUpdateReferences {
	
	
	public void deployCodeModuleAndReferences(ObjectStore os,String codeModuleId,String contentElementsPath){
		CodeModule module=null;
		try {
			PropertyFilter pf=new PropertyFilter();
			//fetch the code module using ID
			module=Factory.CodeModule.fetchInstance(os, new Id(codeModuleId), pf);
			
			//get the version series
			VersionSeries verSeries=module.get_VersionSeries();
			if(!verSeries.get_IsReserved()){
				verSeries.checkout(ReservationType.OBJECT_STORE_DEFAULT	, null	, "CodeModule", null);
				verSeries.save(RefreshMode.REFRESH);
			}
			CodeModule codeModule=(CodeModule) verSeries.get_Reservation();
			System.out.println("Reserved Code Module Document : "+codeModule.get_Id());
			CodeModule releasedCM=(CodeModule) verSeries.get_ReleasedVersion();
			System.out.println("Current Released Code Module Id : "+releasedCM.get_Id());
			
			// add the content elements
			ContentElementList elements=Factory.ContentElement.createList();
			
			File[]  jars=new File(contentElementsPath).listFiles();
			LinkedHashMap<String,File> linkedMap=new LinkedHashMap<>();
			
			for(File f:jars){
				linkedMap.put(f.getName(),f);
			}
			
			// add the files to COntent transfer object
			for(Map.Entry<String, File> file: linkedMap.entrySet()){
				ContentTransfer ct= Factory.ContentTransfer.createInstance();
				try {
					ct.setCaptureSource(new FileInputStream(file.getValue()));
					ct.set_ContentType("application/java-archive");
					ct.set_RetrievalName(file.getKey());
				} catch (Exception e) {
					// TODO: handle exception
				}
				elements.add(ct);
			}
			// added the content elements list to reservation code module
			codeModule.set_ContentElements(elements);
			codeModule.checkin(AutoClassify.DO_NOT_AUTO_CLASSIFY,CheckinType.MAJOR_VERSION);
			codeModule.save(RefreshMode.REFRESH);
			
			// get the references for this code module
			ActionSet actionSet=releasedCM.get_ReferencingActions();
			Iterator itr=actionSet.iterator();
			while(itr.hasNext()){
				Action ac=(Action) itr.next();
				System.out.println("Action : "+ac.get_DisplayName());
				ac.set_CodeModule(codeModule);
				ac.save(RefreshMode.REFRESH);
			}
			
			System.out.println("Code Module "+ codeModule.get_Name()+" is checked in with GUID "+codeModule.get_Id().toString());
			
			
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception Occured : "+e.getMessage());
		}
		
		
	}
}
