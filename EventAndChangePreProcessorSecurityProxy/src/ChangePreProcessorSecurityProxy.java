import com.filenet.api.action.Checkin;
import com.filenet.api.action.Create;
import com.filenet.api.action.PendingAction;
import com.filenet.api.constants.ReservationType;
import com.filenet.api.core.CustomObject;
import com.filenet.api.core.Factory;
import com.filenet.api.core.IndependentlyPersistableObject;
import com.filenet.api.core.RepositoryObject;
import com.filenet.api.engine.ChangePreprocessor;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.util.Id;

public class ChangePreProcessorSecurityProxy implements ChangePreprocessor{

	@Override
	public boolean preprocessObjectChange(IndependentlyPersistableObject object) throws EngineRuntimeException {
		// TODO Auto-generated method stub
		boolean result =false;
		System.out.println("Inside Change Pre processor");
		//filter the actions based on the pending action
		PendingAction actions[] = object.getPendingActions();
		  for ( PendingAction action : actions) {
		    if ( action instanceof Checkin ) {
		    	String selectedcountry=object.getProperties().getStringValue("BAO_Country");
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
				CustomObject so=Factory.CustomObject.fetchInstance(((RepositoryObject) object).getObjectStore(), new Id(spo), null);
				
				object.getProperties().putObjectValue("CountryNameSP", so.getObjectReference());
				result=true;
				
		    }
		  }
		
		return result;
	}
	public boolean isCreate(IndependentlyPersistableObject object) {
		  PendingAction actions[] = object.getPendingActions();
		  for ( PendingAction action : actions) {
		    if ( action instanceof Checkin ) {
		      // These two lines are the new code
		      ReservationType reservationType = ((Create) action).getReservationType();
		      if ( reservationType == null ) return true;
		    }
		  }
		  return false;
		}

}
