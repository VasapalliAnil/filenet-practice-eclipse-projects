package com.test.cm.cca.service;

import java.io.FileInputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filenet.api.collection.ContentElementList;
import com.filenet.api.constants.AutoClassify;
import com.filenet.api.constants.CheckinType;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.ContentTransfer;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.Id;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;

/**
 * Provides an abstract class that is extended to create a class implementing
 * each service provided by the plug-in. Services are actions, similar to
 * servlets or Struts actions, that perform operations on the IBM Content
 * Navigator server. A service can access content server application programming
 * interfaces (APIs) and Java EE APIs.
 * <p>
 * Services are invoked from the JavaScript functions that are defined for the
 * plug-in by using the <code>ecm.model.Request.invokePluginService</code>
 * function.
 * </p>
 * Follow best practices for servlets when implementing an IBM Content Navigator
 * plug-in service. In particular, always assume multi-threaded use and do not
 * keep unshared information in instance variables.
 */
public class CreateDocumentService  extends PluginService {

	/**
	 * Returns the unique identifier for this service.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * </p>
	 * 
	 * @return A <code>String</code> that is used to identify the service.
	 */
	public String getId() {
		return "CreateDocumentService";
	}

	/**
	 * Returns the name of the IBM Content Navigator service that this service
	 * overrides. If this service does not override an IBM Content Navigator
	 * service, this method returns <code>null</code>.
	 * 
	 * @returns The name of the service.
	 */
	public String getOverriddenService() {
		return null;
	}

	/**
	 * Performs the action of this service.
	 * 
	 * @param callbacks
	 *            An instance of the <code>PluginServiceCallbacks</code> class
	 *            that contains several functions that can be used by the
	 *            service. These functions provide access to the plug-in
	 *            configuration and content server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> object that provides the
	 *            request. The service can access the invocation parameters from
	 *            the request.
	 * @param response
	 *            The <code>HttpServletResponse</code> object that is generated
	 *            by the service. The service can get the output stream and
	 *            write the response. The response must be in JSON format.
	 * @throws Exception
	 *             For exceptions that occur when the service is running. If the
	 *             logging level is high enough to log errors, information about
	 *             the exception is logged by IBM Content Navigator.
	 */
	public void execute(PluginServiceCallbacks callbacks,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		
		JSONResponse jsonresponse=new JSONResponse();
		String customId=request.getParameter("CustomId");
		String documentTitle=request.getParameter("DocumentTitle");
		String filepath=request.getParameter("FilePath");
		String mimeType=request.getParameter("MimeType");
		
		
		 
		 
		try{
			System.out.println("Creating the document manually");
			
		ObjectStore os=callbacks.getP8ObjectStore("icmtos");
		System.out.println("Object Store "+os);
		// Create a document instance.
		Document doc = Factory.Document.createInstance(os, "CustIDClass",new Id(customId));
		// Set document properties.
		doc.getProperties().putValue("DocumentTitle", documentTitle);
		doc.getProperties().putValue("CustomID", new Id(customId));
		// adding the document
		ContentTransfer ctObject = Factory.ContentTransfer.createInstance();
	    FileInputStream fileIS = new FileInputStream(filepath);
	    ContentElementList contentList = Factory.ContentTransfer.createList();
	    ctObject.setCaptureSource(fileIS);
	    // Add ContentTransfer object to list.
	    contentList.add(ctObject);
	    ctObject.set_RetrievalName(documentTitle);
	    doc.set_MimeType(mimeType);
	    doc.set_ContentElements(contentList);
	    
				

		doc.save(RefreshMode.NO_REFRESH );

		// Check in the document.
		doc.checkin(AutoClassify.DO_NOT_AUTO_CLASSIFY, CheckinType.MAJOR_VERSION);
		doc.save(RefreshMode.NO_REFRESH);
		
		jsonresponse.put("isItAdded", "true");
		}
		catch(Exception e){
			System.out.println("Exception occured:"+e);
			jsonresponse.put("error", e.getMessage());
			jsonresponse.put("isItAdded", "false");
		}
		PluginResponseUtil.writeJSONResponse(request, response, jsonresponse, callbacks, "CreateDocumentService");

	}
}
