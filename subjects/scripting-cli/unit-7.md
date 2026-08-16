# Unit 7 — Kubernetes CLI (`kubectl`) Cheat Sheet

A minimal, practical reference for cluster management, pod operations, deployments, services, troubleshooting, and **`kubectl`** workflows.

---

## 1. Core Technical Definitions

> **Pod:** The atomic deployable compute unit in Kubernetes, wrapping one or more containers sharing network namespaces and storage volumes.
>
> **Deployment & ReplicaSet:** A Deployment orchestrates declarative updates, rollouts, and autoscaling across a ReplicaSet of identical pods.
>
> **Service vs Ingress:** A Service provides stable internal L4 IP/DNS load balancing between Pods; Ingress manages external L7 HTTP/HTTPS traffic routing into the cluster.
>
> **ConfigMap vs Secret:** ConfigMap stores plain non-confidential configuration key-values; Secret stores base64-encoded/encrypted sensitive data (passwords, tokens, TLS keys).

---

## 2. Context, Cluster & Namespaces

| Command | Purpose | Example |
|---|---|---|
| `kubectl config get-contexts` | List all available cluster contexts | `kubectl config get-contexts` |
| `kubectl config use-context` | Switch active cluster context | `kubectl config use-context prod-cluster` |
| `kubectl config current-context` | Display name of current active context | `kubectl config current-context` |
| `kubectl get namespaces` | List all cluster namespaces | `kubectl get ns` |
| `kubectl create namespace` | Create a new namespace | `kubectl create ns staging` |
| `kubectl config set-context` | Set default namespace for current context | `kubectl config set-context --current --namespace=staging` |

---

## 3. Resource Querying & Formatting

| Command | Purpose | Example |
|---|---|---|
| `kubectl get` | List one or more resource types | `kubectl get pods -n production` |
| `kubectl get -o wide` | List resources with node, IP, and details | `kubectl get pods -o wide` |
| `kubectl get -o yaml` | Output complete resource manifest in YAML | `kubectl get deploy/web-api -o yaml` |
| `kubectl describe` | Detailed status, lifecycle events, and diagnostics | `kubectl describe pod/auth-service-xyz` |
| `kubectl get all` | Display all workloads, pods, and services | `kubectl get all -n dev` |

### Useful Filtering Flags

```text
-n <namespace>        → specify namespace
-A / --all-namespaces → query across all namespaces
-l app=frontend       → filter resources by label
--watch / -w          → stream real-time updates as status changes
-o jsonpath='{...}'   → extract specific fields from JSON output
```

---

## 4. Pod Operations & Troubleshooting

| Command | Purpose | Example |
|---|---|---|
| `kubectl logs` | Print logs for a pod container | `kubectl logs -f pod-name` |
| `kubectl logs --previous` | Inspect logs of crashed container instance | `kubectl logs pod-name --previous` |
| `kubectl exec` | Run interactive terminal command in pod | `kubectl exec -it pod-name -- /bin/sh` |
| `kubectl port-forward` | Forward local port to a pod / service port | `kubectl port-forward svc/redis 6379:6379` |
| `kubectl cp` | Copy files between local machine and pod | `kubectl cp ./config.json pod-name:/app/` |
| `kubectl delete pod` | Force terminate a pod | `kubectl delete pod pod-name --grace-period=0 --force` |
| `kubectl run` | Quickly spawn an ad-hoc debugging pod | `kubectl run tmp-shell --rm -it --image=alpine -- /bin/sh` |

---

## 5. Deployments, Rollouts & Scaling

| Command | Purpose | Example |
|---|---|---|
| `kubectl scale` | Scale replica count of deployment | `kubectl scale deploy/web --replicas=5` |
| `kubectl rollout status` | Check progress of a deployment update | `kubectl rollout status deploy/web` |
| `kubectl rollout history` | View revision history of deployment | `kubectl rollout history deploy/web` |
| `kubectl rollout undo` | Rollback to previous deployment revision | `kubectl rollout undo deploy/web` |
| `kubectl rollout restart` | Trigger a rolling restart of all pods | `kubectl rollout restart deploy/web` |
| `kubectl set image` | Update container image on deployment | `kubectl set image deploy/web web=nginx:1.25` |

---

## 6. Declarative Manifest Management (`apply` / `delete`)

| Command | Purpose | Example |
|---|---|---|
| `kubectl apply -f` | Create or update resources from YAML file/dir | `kubectl apply -f deployment.yaml` |
| `kubectl apply -k` | Apply resources processed via Kustomize directory | `kubectl apply -k ./overlays/prod` |
| `kubectl delete -f` | Delete all resources defined in YAML file | `kubectl delete -f deployment.yaml` |
| `kubectl diff -f` | Preview changes between live cluster and YAML file | `kubectl diff -f manifest.yaml` |

---

## 7. Services, Ingress & Networking

| Command | Purpose | Example |
|---|---|---|
| `kubectl get svc` | List cluster services and virtual IPs | `kubectl get svc -o wide` |
| `kubectl expose` | Expose deployment/pod as a Service | `kubectl expose deploy web --port=80 --target-port=8080 --type=ClusterIP` |
| `kubectl get ingress` | List HTTP/HTTPS Ingress routing rules | `kubectl get ingress` |
| `kubectl get endpoints` | View target pod IP mappings for services | `kubectl get ep` |

---

## 8. ConfigMaps & Secrets

| Command | Purpose | Example |
|---|---|---|
| `kubectl get configmap` | List ConfigMaps | `kubectl get cm` |
| `kubectl create configmap` | Create ConfigMap from literal or file | `kubectl create cm app-cfg --from-file=config.json` |
| `kubectl get secret` | List Secrets in namespace | `kubectl get secrets` |
| `kubectl create secret` | Create generic secret from key-value | `kubectl create secret generic db-pass --from-literal=password=P@ss123` |
| `kubectl create secret tls` | Create TLS certificate secret | `kubectl create secret tls tls-secret --cert=tls.crt --key=tls.key` |

---

## 9. Nodes & Cluster Resource Monitoring

| Command | Purpose | Example |
|---|---|---|
| `kubectl get nodes` | List all cluster worker/control plane nodes | `kubectl get nodes` |
| `kubectl top nodes` | Display CPU and Memory utilization per node | `kubectl top nodes` |
| `kubectl top pods` | Display CPU and Memory consumption per pod | `kubectl top pods --sort-by=memory` |
| `kubectl cordon` | Mark node as unschedulable (prevents new pods) | `kubectl cordon node-01` |
| `kubectl drain` | Safely evict pods from node for maintenance | `kubectl drain node-01 --ignore-daemonsets --delete-emptydir-data` |
| `kubectl uncordon` | Mark node as schedulable again | `kubectl uncordon node-01` |
