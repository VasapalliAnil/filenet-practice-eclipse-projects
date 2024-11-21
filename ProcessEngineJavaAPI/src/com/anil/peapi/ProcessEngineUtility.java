package com.anil.peapi;

import org.w3c.dom.Document;

import filenet.vw.api.VWAttributeInfo;
import filenet.vw.api.VWFetchType;
import filenet.vw.api.VWQueueDefinition;
import filenet.vw.api.VWRoster;
import filenet.vw.api.VWRosterQuery;
import filenet.vw.api.VWSession;
import filenet.vw.api.VWSystemConfiguration;
import filenet.vw.api.VWWorkObject;

public class ProcessEngineUtility {

	public void getQueueNames(VWSession vwSession) {
		// TODO Auto-generated method stub
		String[] queueNames = vwSession.getQueueNames(false);
		System.out.println("Queues in this Connection point :" + vwSession.getConnectionPointName());
		for (int i = 0; i < queueNames.length; i++) {
			System.out.println(i + "  :  " + queueNames[i]);
		}

	}

	public void getRosterNames(VWSession vwSession) {
		// TODO Auto-generated method stub

		String[] rosterNames = vwSession.getRosterNames();
		System.out.println("Rosters in this Connection point :" + vwSession.getConnectionPointName());
		for (int i = 0; i < rosterNames.length; i++) {
			System.out.println(i + "  :  " + rosterNames[i]);
		}

	}

	/**
	 * @param vwSession
	 * @param propSymbolicName
	 * @param value
	 */
	public VWRosterQuery getWorkItemInRosterUsingCustomProperty(VWSession vwSession, String roster,
			String propSymbolicName, String value) {
		VWRoster rost = vwSession.getRoster(roster);
		String filter = "";
		if (propSymbolicName.equalsIgnoreCase("F_WobNum")) {
			filter = propSymbolicName + "= x'" + value + "'";
		} else {
			filter = propSymbolicName + "= '" + value + "'";
		}

		System.out.println("Filter is : " + filter);
		VWRosterQuery rq = rost.createQuery(null, null, null, VWRoster.QUERY_READ_UNWRITABLE, filter, null,
				VWFetchType.FETCH_TYPE_WORKOBJECT);

		return rq;

	}
	public void getCurrentQueue(VWSession vwSession, String roster, String propSymbolicName, String value){
		VWRosterQuery rq = getWorkItemInRosterUsingCustomProperty(vwSession, roster, propSymbolicName, value);
		Boolean widPresent = false;
		while (rq != null && rq.hasNext()) {
			widPresent = true;
			VWWorkObject wob = (VWWorkObject) rq.next();
			System.out.println("wid found :" + wob.getWorkObjectNumber());
			System.out.println("Current Queue :"+wob.getCurrentQueueName());
			// dispatch to next step
//			wob.doLock(true);
//			wob.doDispatch();
//			wob.doSave(true);
			
		
		}
		if (!widPresent) {
			System.out.println("Wid not found with the search criteria");
		}
	}

	public void unlockWorkItems(VWSession vwSession, String roster, String propSymbolicName, String value) {
		VWRosterQuery rq = getWorkItemInRosterUsingCustomProperty(vwSession, roster, propSymbolicName, value);
		Boolean widPresent = false;
		while (rq != null && rq.hasNext()) {

			widPresent = true;
			VWWorkObject wob = (VWWorkObject) rq.next();
			System.out.println("wid found :" + wob.getWorkObjectNumber());
			System.out.println("Current Queue :"+wob.getCurrentQueueName());
			if (wob.getLockedUser() != null) {
				
				System.out.println("Locked by : " + wob.getLockedUser());
				wob.doRefresh(true, true);
				wob.doSave(true);
				
				System.out.println("Wid is unlocked now");
			} else {
				System.out.println("wid is not locked");
			}

		}
		if (!widPresent) {
			System.out.println("Wid not found with the search criteria");
		}

	}

	public void updateCQWithCodeModule(VWSession vwSession,String codemoduleId,String componentQName) throws Exception {
		
		// TODO Auto-generated method stub
		System.out.println("Inside update componenet queue");
		VWSystemConfiguration vsc=vwSession.fetchSystemConfiguration();
		
		
		
		VWQueueDefinition cqd=vsc.getQueueDefinition(componentQName);
		System.out.println("Component Queue Name :"+cqd.getName());
		System.out.println("Get All the attributes");
		
			VWAttributeInfo	ainfo=cqd.getAttributeInfo();
			String[] attrList=ainfo.getAttributeNames();
		if(attrList != null){
			String attr="F_ComponentDescriptor";
				System.out.println("Field Name : "+attr);
				System.out.println("value is : "+ainfo.getFieldValue(attr));
				
				String doc=(String) ainfo.getFieldValue(attr);
				
				String updatedDescriptor=XMLUpdater.updateCodeModuleIdInXML(doc,codemoduleId);
				//System.out.println("Updated value is : "+updatedDescriptor);
			
			ainfo.setFieldValue("F_ComponentDescriptor", updatedDescriptor);
			cqd.setAttributeInfo(ainfo);
			vsc.commit();
			System.out.println("Component Queue updated");
		}
		
		
	}

}
