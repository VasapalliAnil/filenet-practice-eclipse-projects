import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.CustomObject;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.engine.EventActionHandler;
import com.filenet.api.events.ObjectChangeEvent;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.util.Id;

public class SecurityProxyClass implements EventActionHandler{

	@Override
	public void onEvent(ObjectChangeEvent triggeredEvent, Id subscriptionId) throws EngineRuntimeException {
		// TODO Auto-generated method stub
		System.out.println("Inside Security Proxy Code Module");
		System.out.println("Class Name: "+triggeredEvent.getClassName());
		System.out.println("Document id :"+triggeredEvent.get_SourceObjectId());
		Id id=triggeredEvent.get_SourceObjectId();
		ObjectStore os=triggeredEvent.getObjectStore();
		Document d=Factory.Document.fetchInstance(os, id, null);
		String selectedcountry=d.getProperties().getStringValue("BAO_Country");
		System.out.println("Country Selected :"+selectedcountry);
		String spo="";
		
		if(selectedcountry.equalsIgnoreCase("india")){
			spo="{AA44E5E9-D10A-461A-8C3F-AC0ECAFF96CF}";
			System.out.println("Selected india and retrieving the India Security proxy");
		}
		else if(selectedcountry.equalsIgnoreCase("usa")){
			spo="{009961DA-E461-4BEF-8969-101B7E66CAE6}";
			System.out.println("Selected usa and retrieving the usa Security proxy");
		}
		// now we need to get the custom object ref
		CustomObject so=Factory.CustomObject.fetchInstance(os, new Id(spo), null);
		
		d.getProperties().putObjectValue("CountryNameSP", so.getObjectReference());
		d.save(RefreshMode.NO_REFRESH);
		System.out.println("Document got updated with security");
		
		
		
	}

}
