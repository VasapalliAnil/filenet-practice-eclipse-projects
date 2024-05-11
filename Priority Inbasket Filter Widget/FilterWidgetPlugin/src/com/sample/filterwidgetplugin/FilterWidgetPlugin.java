package com.sample.filterwidgetplugin;
import java.util.Locale;
import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;

public class FilterWidgetPlugin extends Plugin {

	@Override
	public String getId() {
		return "FilterWidgetPlugin";
	}

	@Override
	public String getName(Locale arg0) {
		return "Priority Inbasket Filter Widget Plugin";
	}

	@Override
	public String getVersion() {
		return "1.0.0";
	}

	@Override
	public PluginAction[] getActions() {
		return new PluginAction[] {};
	}

	@Override
	public String getScript() {
		return "FilterWidgetPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return null;
	}

	@Override
	public String getCSSFileName() {
		return "FilterWidgetPlugin.css";
	}


}
