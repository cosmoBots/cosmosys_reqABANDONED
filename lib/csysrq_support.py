def draw_descendants(redmine,server_url,issue_id,graph):
    my_issue = redmine.issue.get(issue_id)
    graph.node(str(my_issue.id),my_issue.subject,URL=server_url+'/issues/'+str(my_issue.id))
    #print(my_issue.id,": ",my_issue.subject)
    for child in my_issue.children:
        #print(child.id,": ",child.subject)
        graph.node(str(child.id),child.subject,URL=server_url+'/issues/'+str(child.id))
        graph.edge(str(my_issue.id),str(child.id))
        draw_descendants(redmine,server_url,child.id,graph)
    
    return my_issue

def draw_ancestors(redmine,server_url,issue_id,child_id,graph):
    my_issue = redmine.issue.get(issue_id)
    #print("THIS : "+str(issue_id))
    graph.node(str(my_issue.id),my_issue.subject,URL=server_url+'/issues/'+str(my_issue.id))
    graph.edge(str(my_issue.id),str(child_id))
    # https://stackoverflow.com/questions/37543513/read-the-null-value-in-python-redmine-api
    # Short answer: Use getattr(id, 'assigned_to', None) instead of id.assigned_to.
    current_parent = getattr(my_issue, 'parent', None)
    #print("my_issue: "+str(my_issue))
    if current_parent is not None:
        #print("parent: "+str(current_parent))
        draw_ancestors(redmine,server_url,current_parent,issue_id,graph)
    
    return my_issue

'''  Ejemplo de uso
target_issue_id = 540
prj_graphc = Digraph(name=my_project.identifier+"c", format='svg', engine='dot', node_attr={'shape':'box', 'style':'filled','URL':server_url})
target_issue = draw_descendants(redmine,server_url,target_issue_id,prj_graphc)
if target_issue.parent is not None:
    print("parent 1: "+str(target_issue.parent))
    draw_ancestors(redmine,server_url,target_issue.parent,target_issue_id,prj_graphc)

prj_graphc.node(str(target_issue.id),target_issue.subject,URL=server_url+'/issues/'+str(target_issue.id),color='green')
prj_graphc.render()
'''


def draw_postpropagation(redmine,server_url,issue_id,graph):
    my_issue = redmine.issue.get(issue_id)
    graph.node(str(my_issue.id),my_issue.subject,URL=server_url+'/issues/'+str(my_issue.id))
    #print(my_issue.id,": ",my_issue.subject)

    my_issue_relations = redmine.issue_relation.filter(issue_id=my_issue.id)
    #print(len(my_issue_relations))
    my_filtered_issue_relations = list(filter(lambda x: x.issue_to_id != my_issue.id, my_issue_relations))
    #print(len(my_filtered_issue_relations))
    if (len(my_filtered_issue_relations)>0):
        for r in my_filtered_issue_relations:
            #print("\t"+r.relation_type+"\t"+str(r.issue_id)+"\t"+str(r.issue_to_id))
            graph.edge(str(my_issue.id),str(r.issue_to_id),color="blue") 
            draw_postpropagation(redmine,server_url,r.issue_to_id,graph)
        
    return my_issue

            
def draw_prepropagation(redmine,server_url,issue_id,graph):
    my_issue = redmine.issue.get(issue_id)
    graph.node(str(my_issue.id),my_issue.subject,URL=server_url+'/issues/'+str(my_issue.id))
    #print(my_issue.id,": ",my_issue.subject)
    
    my_issue_relations = redmine.issue_relation.filter(issue_id=my_issue.id)
    #print(len(my_issue_relations))
    my_filtered_issue_relations = list(filter(lambda x: x.issue_to_id == my_issue.id, my_issue_relations))
    #print(len(my_filtered_issue_relations))
    if (len(my_filtered_issue_relations)>0):
        for r in my_filtered_issue_relations:
            #print("\t"+r.relation_type+"\t"+str(r.issue_id)+"\t"+str(r.issue_to_id))
            graph.edge(str(r.issue_id),str(my_issue.id),color="blue") 
            draw_prepropagation(redmine,server_url,r.issue_id,graph)
        
    
    return my_issue

''' Example of use 
prj_graphd = Digraph(name=my_project.identifier+"d", format='svg', engine='dot', node_attr={'shape':'box', 'style':'filled','URL':server_url})
my_issue = draw_postpropagation(redmine,server_url,target_issue_id,prj_graphd)
draw_prepropagation(redmine,server_url,target_issue_id,prj_graphd)
prj_graphd.node(str(my_issue.id),my_issue.subject,URL=server_url+'/issues/'+str(my_issue.id),color='green')


prj_graphd.render()
'''