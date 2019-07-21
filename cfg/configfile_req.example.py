# This section configures the connection between the CosmoSys_Req tools and the Redmine instance which implements the requirements database
req_server_url = 'http://myrequirementsserver.domain'	# The Redmine URL
req_key_txt = 'the API key of the redmine'			# The API key of the user (or bot) in which name the actions are undertaken.
req_project_id_str = 'myprojectid'						# The ID of the Redmine project where the requirements are stored.

# Trackers section
req_rq_tracker_id = 4									# The numerical ID of the tracker used to model the requirements
req_doc_tracker_id = 5									# The numerical ID of the tracker used to model the documents of requirements
req_relation_str = 'blocks'								# The redmine relationship type used to map the requirements dependence relationships
# Custom field mapping of the requirement attributes
# Note: the ID is mapped on Redmine issue ID field, the RqID is mapped on Subject field, the RqTarget is mapped on Version field.
# Note: the RqDoc is mapped using the Parent relationship between the requirement (child) and the document (father).  The document is using a different tracker (RqDoc) from the requirement (Req)
req_title_cf_id = 1									# The numerical ID of the custom_field used to store the title of the requirement
req_sources_cf_id = 5									# The numerical ID of the custom_field used to store the RqSources of the requirement
req_type_cf_id = 2										# The numerical ID of the custom_field used to store the RqType of the requirement
req_level_cf_id = 3									# The numerical ID of the custom_field used to store the RqLevel of the requirement
req_rationale_cf_id = 4								# The numerical ID of the custom_field used to store the RqRationale of the requirement
req_value_cf_id = 8									# The numerical ID of the custom_field used to store the RqValue of the requirement
req_var_cf_id = 7									# The numerical ID of the custom_field used to store the RqVar of the requirement
req_chapter_cf_id = 6 								# The numerical ID of the custom_field used to store the RqChapter of the requirement
req_prefix_cf_id = 9								# The numerical ID of the custom_field used to store the requirements document prefix of the requirement
req_diagrams_cf_id = 14									# The numerical ID of the custom_field used to store the diagrams graphviz description
reqprj_diagrams_cf_id = 17									# The numerical ID of the custom_field used to store the diagrams graphviz description of the whole project

# This section defines the connection between the CosmoSys_Req tools and the OpenDocument spreadsheet used for importing requirements
req_upload_file_name = "./uploading/RqUpload.ods"
req_download_file_name = "./downloading/RqDownload.ods"
req_upload_start_column = 0
req_upload_end_column = 16
req_upload_start_row = 0
req_upload_end_row = 199

#This section defines the document information cell indexes to retrieve information for the documents from the upload file
req_upload_doc_row = 0
req_upload_doc_name_column = 1
req_upload_doc_prefix_column = 5
req_upload_doc_parent_column = 3

#This section defines the requirements information cell indexes to retrieve information for the requirements from the upload file
req_upload_first_row = 2
req_upload_column_number = req_upload_end_column + 1
req_upload_id_column = 4
req_upload_related_column = 10
req_upload_title_column = 5
req_upload_descr_column = 6
req_upload_source_column = 11
req_upload_type_column = 9
req_upload_level_column = 8
req_upload_rationale_column = 15
req_upload_var_column = 13
req_upload_value_column = 14
req_upload_chapter_column = 0
req_upload_target_column = 12
req_upload_parent_column = 7
req_upload_status_column = 16

req_upload_version_column = 5
req_upload_version_startrow = 1
req_upload_version_endrow = 25

req_download_doc_row = 0
req_download_doc_name_column = 1
req_download_doc_prefix_column = 10
req_download_doc_parent_column = 8
req_download_bdid_column = 3
req_download_rqid_column = 1
req_download_url_row = 0
req_download_url_column = 1

req_status_maturity = {
    'RqDraft': 1,
    'RqStable': 2,
    'RqApproved': 3,
    'RqIncluded': 3,
    'RqValidated': 3,
    'RqRejected': 0,
    'RqErased': 1,
    'RqZombie': 0
}

req_maturity_propagation = ['RqZombie','RqDraft','RqStable','RqApproved']

img_dir = "reporting/doc/img/"

