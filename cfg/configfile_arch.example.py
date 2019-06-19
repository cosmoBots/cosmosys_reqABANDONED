# This section configures the connection between the CosmoSys_Arch tools and the Redmine instance which implements the architecture database
arch_server_url = 'http://myarchitectureserver.domain'	# The Redmine URL
arch_key_txt = 'the bot API key of the redmine'			# The API key of the user (or bot) in which name the actions are undertaken.
arch_project_id_str = 'myprojectid'						# The ID of the Redmine project where the architecture is stored.
arch_sys_tracker_id = 11									# The numerical ID of the tracker used to model the systems
arch_doc_tracker_id = 16									# The numerical ID of the tracker used to model the documents of systems
arch_relation_str = 'blocks'								# The redmine relationship type used to map the systems dependence relationships

# Custom field mapping of the system attributes
# Note: the ID is mapped on Redmine issue ID field, the SysID is mapped on Subject field, the SysTarget is mapped on Version field.
# Note: the SysDoc is mapped using the Parent relationship between the system (child) and the document (father).  The document is using a different tracker (SysDoc) from the system (Sys)
arch_title_cf_id = 42									# The numerical ID of the custom_field used to store the title of the system
arch_type_cf_id = 8										# The numerical ID of the custom_field used to store the RqType of the system
arch_level_cf_id = 11									# The numerical ID of the custom_field used to store the RqLevel of the system
arch_chapter_id = 44 									# The numerical ID of the custom_field used to store the RqChapter of the system

# This section defines the connection between the CosmoSys_Arch tools and the OpenDocument spreadsheet used for importing an architecture
arch_upload_file_name = "ArchUpload.ods"					
arch_upload_start_column = 0
arch_upload_end_column = 6
arch_upload_start_row = 0
arch_upload_end_row = 200
