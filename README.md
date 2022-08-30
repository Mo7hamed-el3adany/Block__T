## Referance

  01. Run frist Ex_1.      
    - `docker-compose up`     


<a name="One"></a>

### I. Commonly used commands in docker:
  1. Build a image.    
    - `docker build -t "image-name" .`     
    - `docker build -f "Dockerfile.dev" -t "image-name" .      

  2. Run a container.      
    - `docker run -it --rm --name "container-name" -p 5000:5000 "image-name"`     
    - `docker run -it -d --rm --name "container-name" -p 5000:5000 "image-name"`   
    - with -d: detach -> run a container in the background.     

  3. Stop a container.      
    - `docker stop "container-name"`       

  4. Stop all running containers.      
    - `docker stop $(docker ps -a -q)`      

  5. Show all images.  
    - `docker images`     

  6. Delete a image.  
    - `docker rmi "image-id|image-name"`  

  7. Delete all images.  
    - `docker rmi $(docker images -q)`  

  8. Delete all <none> images.  
    - `docker rmi $(docker images -f dangling=true -q)` 

  9. Show all running containers.         
    - `docker ps`  

  10. Show all containers.         
    - `docker ps -a`  

  11. Delete a stopped container.         
    - `docker rm "container-name"`  

  12. Delete all stopped containers.         
    - `docker rm $(docker ps -a -q)`  

  13. Kill all running containers.         
    - `docker kill $(docker ps -q)`  

  14. List volumes.         
    - `docker volume ls`

  15. Remove all unused local volumes.         
    - `docker volume prune`

  16. Remove one or more volumes.         
    - `docker volume rm "volume-name"`

  17. Run commands in a docker container.         
    - `docker exec -it "container-name" sh`

  18. Push image to docker hub.         
    - `docker push "image-name:tag"`

  19. Pull image from docker hub.         
    - `docker pull "image-name:tag"`


<a name="Two"></a>

### II. Commonly used commands in docker-compose:  
  1. Build and rebuild a image.    
    - `docker-compose up --build`  
    - `docker-compose -f "docker-compose.dev.yml" up --build`  

  2. Run and start containers.    
    - `docker-compose up`   
    - `docker-compose -f "docker-compose.dev.yml" up`  

  3. Stop and clear containers.    
    - `docker-compose down`  
    - `docker-compose -f "docker-compose.dev.yml" down`  
 
  4. Stop and clear containers, volumes.    
    - `docker-compose down -v`  
    - `docker-compose -f "docker-compose.dev.yml" down -v`  



 

  ## 2. Commonly used commands in K8S:
  
   
## PODS

```
$ kubectl get pods
$ kubectl get pods --all-namespaces
$ kubectl get pod monkey -o wide
$ kubectl get pod monkey -o yaml
$ kubectl describe pod monkey
```

## Create Deployments

Create single deployment

```
$ kubectl run monkey --image=monkey --record
```

## Scaling PODs

```bash
$ kubectl scale deployment/POD_NAME --replicas=N
```

## POD Upgrade and history

#### List history of deployments

```
$ kubectl rollout history deployment/DEPLOYMENT_NAME
```

#### Jump to specific revision

```
$ kubectl rollout undo deployment/DEPLOYMENT_NAME --to-revision=N
```

## Services

List services

```
$ kubectl get services
```

Expose PODs as services (creates endpoints)

```
$ kubectl expose deployment/monkey --port=2001 --type=NodePort
```

## Volumes

Lits Persistent Volumes and Persistent Volumes Claims:

```
$ kubectl get pv
$ kubectl get pvc
```

## Secrets

```
$ kubectl get secrets
$ kubectl create secret generic --help
$ kubectl create secret generic mysql --from-literal=password=root
$ kubectl get secrets mysql -o yaml
```
## ConfigMaps

```
$ kubectl create configmap foobar --from-file=config.js
$ kubectl get configmap foobar -o yaml
```

## DNS

List DNS-PODs:

```
$ kubectl get pods --all-namespaces |grep dns
```

Check DNS for pod nginx (assuming a busybox POD/container is running)

```
$ kubectl exec -ti busybox -- nslookup nginx
```

> Note: kube-proxy running in the worker nodes manage services and set iptables rules to direct traffic.

## Ingress

Commands to manage Ingress for ClusterIP service type:

```
$ kubectl get ingress
$ kubectl expose deployment ghost --port=2368
```

Spec for ingress:

- [backend](https://github.com/kubernetes/ingress/tree/master/examples/deployment/nginx)
 
## Horizontal Pod Autoscaler

When heapster runs:

```
$ kubectl get hpa
$ kubectl autoscale --help
```

## DaemonSets

```
$ kubectl get daemonsets
$ kubectl get ds
```

## Scheduler

NodeSelector based policy:

```
$ kubectl label node minikube foo=bar
```

Node Binding through API Server:

```
$ kubectl proxy 
$ curl -H "Content-Type: application/json" -X POST --data @binding.json http://localhost:8001/api/v1/namespaces/default/pods/foobar-sched/binding
```

## Tains and Tolerations

```
$ kubectl taint node master foo=bar:NoSchedule
```

## Troubleshooting

```
$ kubectl describe
$ kubectl logs
$ kubectl exec
$ kubectl get nodes --show-labels
$ kubectl get events
```

Docs Cluster: 
- https://kubernetes.io/docs/tasks/debug-application-cluster/debug-cluster/
- https://github.com/kubernetes/kubernetes/wiki/Debugging-FAQ

## Role Based Access Control

- Role
- ClusterRule
- Binding
- ClusterRoleBinding

```
$ kubectl create role fluent-reader --verb=get --verb=list --verb=watch --resource=pods
$ kubectl create rolebinding foo --role=fluent-reader --user=minikube
$ kubectl get rolebinding foo -o yaml
```

## Security Contexts

Docs: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

- spec
 - securityCOntext
   - runAsNonRoot: true
   
## Pod Security Policies

Docs: https://github.com/kubernetes/kubernetes/blob/master/examples/podsecuritypolicy/rbac/README.md

## Network Policies

Network isolation at Pod level by using annotations

```
$ kubectl annotate ns <namespace> "net.beta.kubernetes.io/network-policy={\"ingress\": {\"isolation\": \"DefaultDeny\"}}"
```

More about Network Policies as a resource: 

https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy/
