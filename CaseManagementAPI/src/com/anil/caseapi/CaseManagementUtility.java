package com.anil.caseapi;

import java.util.ArrayList;
import java.util.List;

import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Domain;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.property.FilterElement;
import com.filenet.api.property.PropertyFilter;
import com.filenet.api.util.Id;
import com.ibm.casemgmt.api.Case;
import com.ibm.casemgmt.api.CaseType;
import com.ibm.casemgmt.api.DeployedSolution;
import com.ibm.casemgmt.api.constants.ModificationIntent;
import com.ibm.casemgmt.api.objectref.ObjectStoreReference;
import com.ibm.casemgmt.api.tasks.Task;

public class CaseManagementUtility {
	public static ObjectStore os = null;
	public static Domain domain = null;
	public static ObjectStoreReference osRef = null;

	public void getDomain() {
		domain = Factory.Domain.fetchInstance(CaseManagementConnection.conn, null, null);
		System.out.println("Domain Name: " + domain.get_Name());

	}

	public void getObjectStore(String tos) {
		getDomain();
		os = Factory.ObjectStore.fetchInstance(domain, tos, null);
		System.out.println("Object Store :" + os.get_Name());
	}

	// Get the object store reference for case management api
	public void getObjectStoreReference(String tos) {
		getObjectStore(tos);
		osRef = new ObjectStoreReference(os);

	}

	public DeployedSolution getDeployedSolution(String tos, String solutionName) {

		getObjectStoreReference(tos);
		// Get the deployed solution using the OBject store reference and
		// solution name
		DeployedSolution someSolution = DeployedSolution.fetchInstance(osRef, solutionName);
		System.out.println("Case Manager Solution : " + someSolution.getSolutionName());
		return someSolution;

	}

	public void getSolutionCaseTypes(String tos, String solutionName) {

		DeployedSolution someSolution = getDeployedSolution(tos, solutionName);
		List<CaseType> caseTypes = someSolution.getCaseTypes();
		System.out.println("Case Types Available in Solution " + solutionName + " is : " + caseTypes.size());
		for (CaseType ct : caseTypes) {
			// print the
			System.out.println(ct.getName());
		}
	}

	public CaseType getSolutionCaseType(String tos, String solutionName, String caseType) {
		CaseType returnCt = null;
		DeployedSolution someSolution = getDeployedSolution(tos, solutionName);
		List<CaseType> caseTypes = someSolution.getCaseTypes();
		System.out.println("Case Types Available in Solution " + solutionName + " is : " + caseTypes.size());
		for (CaseType ct : caseTypes) {

			System.out.println(ct.getName());
			if (caseType.equals(ct.getName())) {
				returnCt = ct;
				break;
			}

		}
		return returnCt;
	}

	public void createCase(String tos, String solutionName, String caseType) {
		CaseType retrievedCt = getSolutionCaseType(tos, solutionName, caseType);
		if (retrievedCt == null) {
			System.out.println("Case Type is not found in the " + solutionName
					+ " solution. Please provide the correct Case Type");
		} else {

		}
		Case pendCase = Case.createPendingInstance(retrievedCt);
		// set the customer name to anil
		pendCase.getProperties().putObjectValue("CCA_CustomerName", "Anil");

		// Get document and populate property cache.
		PropertyFilter pf = new PropertyFilter();
		pf.addIncludeProperty(new FilterElement(null, null, null, "Id", null));
		pf.addIncludeProperty(new FilterElement(null, null, null, "CmAcmCaseIdentifier", null));
		// save gthe case

		pendCase.save(RefreshMode.REFRESH, pf, ModificationIntent.NOT_MODIFY);

		// fetch the Case identifier of the created case
		System.out.println("Case Created Successfully. Case identifer is : " + pendCase.getIdentifier());
		System.out.println(
				"Case Created Successfully. CaseFolder ID is : " + pendCase.getProperties().getObjectValue("Id"));

	}

	public Case retrieveCaseById(String tos, String solutionName, String id) {
		getObjectStoreReference(tos);
		PropertyFilter pf = new PropertyFilter();
		System.out.println("Retrieving the case by Case Id : " + id);
		Case exCase = Case.fetchInstance(osRef, new Id(id), pf, ModificationIntent.MODIFY);

		return exCase;
	}

	public Case retrieveCaseByCaseIdentifier(String tos, String solutionName, String caseIdentifier) {

		getObjectStoreReference(tos);
		PropertyFilter pf = new PropertyFilter();
		System.out.println("Retrieving the case by Case Identifier : " + caseIdentifier);
		Case exCase = null;
		try {
			exCase = Case.fetchInstanceFromIdentifier(osRef, caseIdentifier);
		} catch (Exception e) {
			System.out.println("Exception Occurred while retrieving the case :" + e.getMessage());
		}

		return exCase;
	}

	public void updateCaseById(String tos, String solutionName, String id) {
		Case excase = retrieveCaseById(tos, solutionName, id);
		System.out.println("Case identifier is :" + excase.getIdentifier());
	}

	public void updateCaseByCaseIdentifier(String tos, String solutionName, String caseIdentifier) {

		Case excase = retrieveCaseByCaseIdentifier(tos, solutionName, caseIdentifier);
		if (excase != null) {
			System.out.println("Case Folder id is :" + excase.getId());
		}

	}

	public void getCaseStateById(String tos, String solutionName, String id) {
		Case excase = retrieveCaseById(tos, solutionName, id);
		if (excase != null) {
			System.out.println("Case State is :" + excase.getState());
		}

	}

	public List<Task> getCaseTasksById(String tos, String solutionName, String id) {
		Case excase = retrieveCaseById(tos, solutionName, id);
		List<Task> tasks=new ArrayList<>();
		if (excase != null) {
			tasks = excase.fetchTasks();
			for (Task t : tasks) {
				System.out.println("Task Name :" + t.getName() +" and Task State is : "+t.getState() +" and Task Type is :"+t.getTaskTypeName());
				
			}
		}
		return tasks;
	}
	
	public String getWobNumById(String tos, String solutionName, String id) {
		List<Task> tasks = getCaseTasksById(tos,solutionName,id);
		String wobNum="";
		if (tasks.size() != 0) {
			for (Task t : tasks) {
				
				if(t.getState().toString() == "WORKING"){
					wobNum=t.getProcessInstanceId();
					System.out.println("Task Name :" + t.getName() +" and Task State is : "+t.getState());
					System.out.println("Wob number is :"+wobNum);
					break;
				}
			}
		}
		return wobNum;
		
	}
	
	

}
