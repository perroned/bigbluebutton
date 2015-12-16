package org.bigbluebutton.common.messages;

import java.util.HashMap;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

// Message from bbb-akka-apps to FreeSwitch
public class DeskShareStartRecordingEventMessage {
	public static final String DESKSHARE_START_RECORDING_MESSAGE  = "deskshare_start_recording_message";
	public static final String VERSION = "0.0.1";

	public static final String CONFERENCE_NAME = "conference_name";
	public static final String FILENAME = "filename";
	public static final String TIMESTAMP = "timestamp";

	public final String conferenceName;
	public final String filename;
	public final String timestamp;

	public DeskShareStartRecordingEventMessage(String conferenceName, String filename, String timestamp) {
		this.conferenceName = conferenceName;
		this.filename = filename;
		this.timestamp = timestamp;
	}

	public String toJson() {
		HashMap<String, Object> payload = new HashMap<String, Object>();
		payload.put(CONFERENCE_NAME, conferenceName);
		payload.put(FILENAME, filename);
		payload.put(TIMESTAMP, timestamp);

		java.util.HashMap<String, Object> header = MessageBuilder.buildHeader(DESKSHARE_START_RECORDING_MESSAGE, VERSION, null);

		return MessageBuilder.buildJson(header, payload);
	}

	public static DeskShareStartRecordingEventMessage fromJson(String message) {
		JsonParser parser = new JsonParser();
		JsonObject obj = (JsonObject) parser.parse(message);

		if (obj.has("header") && obj.has("payload")) {
			JsonObject header = (JsonObject) obj.get("header");
			JsonObject payload = (JsonObject) obj.get("payload");

			if (header.has("name")) {
				String messageName = header.get("name").getAsString();
				if (DESKSHARE_START_RECORDING_MESSAGE.equals(messageName)) {
					if (payload.has(CONFERENCE_NAME)
							&& payload.has(TIMESTAMP)
							&& payload.has(FILENAME)) {
						String conferenceName = payload.get(CONFERENCE_NAME).getAsString();
						String filename = payload.get(FILENAME).getAsString();
						String timestamp = payload.get(TIMESTAMP).getAsString();

						return new DeskShareStartRecordingEventMessage(conferenceName, filename, timestamp);
					}
				}
			}
		}
		return null;

	}
}
