# This section configures the connection between the CosmoSys_Req tools and the Redmine instance which implements the requirements database
req_server_url = 'http://myrequirementsserver.domain'	# The Redmine URL
req_key_txt = 'the bot API key of the redmine'			# The API key of the user (or bot) in which name the actions are undertaken.
req_project_id_str = 'myprojectid'						# The ID of the Redmine project where the requirements are stored.
req_rq_tracker_id = 11									# The numerical ID of the tracker used to model the requirements
req_doc_tracker_id = 16									# The numerical ID of the tracker used to model the documents of requirements
req_relation_str = 'blocks'								# The redmine relationship type used to map the requirements dependence relationships
# Custom field mapping of the requirement attributes
# Note: the ID is mapped on Redmine issue ID field, the RqID is mapped on Subject field, the RqTarget is mapped on Version field.
# Note: the RqDoc is mapped using the Parent relationship between the requirement (child) and the document (father).  The document is using a different tracker (RqDoc) from the requirement (Req)
req_title_cf_id = 42									# The numerical ID of the custom_field used to store the title of the requirement
req_source_cf_id = 10									# The numerical ID of the custom_field used to store the RqSources of the requirement
req_type_cf_id = 8										# The numerical ID of the custom_field used to store the RqType of the requirement
req_level_cf_id = 11									# The numerical ID of the custom_field used to store the RqLevel of the requirement
req_rationale_cf_id = 12								# The numerical ID of the custom_field used to store the RqRationale of the requirement
req_value_id = 44										# The numerical ID of the custom_field used to store the RqValue of the requirement
req_var_id = 44											# The numerical ID of the custom_field used to store the RqVar of the requirement
req_chapter_id = 44 									# The numerical ID of the custom_field used to store the RqChapter of the requirement

# This section defines the connection between the CosmoSys_Req tools and the OpenDocument spreadsheet used for importing requirements
req_upload_file_name = "RqUpload.ods"					
req_upload_start_column = 0
req_upload_end_column = 6
req_upload_start_row = 0
req_upload_end_row = 200


