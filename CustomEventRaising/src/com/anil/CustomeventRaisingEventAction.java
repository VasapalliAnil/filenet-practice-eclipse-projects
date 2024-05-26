package com.anil;

import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.engine.EventActionHandler;
import com.filenet.api.events.CustomEvent;
import com.filenet.api.events.ObjectChangeEvent;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.util.Id;

public class CustomeventRaisingEventAction implements EventActionHandler{

	@Override
	public void onEvent(ObjectChangeEvent event, Id subscriptionId) throws EngineRuntimeException {
		// TODO Auto-generated method stub
		System.out.println("Inside Custom Event Raising Event Action");
		
		// Get the doc id
		Id id=event.get_SourceObjectId();
		
		// Retrieve the document
		ObjectStore os=event.getObjectStore();
		Document doc=Factory.Document.fetchInstance(os, id, null);
		// Create a custom Dummy Event
		CustomEvent cevent=Factory.CustomEvent.createInstance(os, "DummyEvent");
		cevent.set_EventStatus(new Integer(0));
		// raise the custom dummy event
		doc.raiseEvent(cevent);
		doc.save(RefreshMode.NO_REFRESH);
		
		System.out.println("Custom Dummy Event Raised"); 
		
		
		
	}

}
