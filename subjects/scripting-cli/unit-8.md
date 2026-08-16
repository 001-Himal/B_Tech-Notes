# Unit 8 — Cloud CLIs: AWS, Azure & Google Cloud Cheat Sheet

A concise, side-by-side practical reference for **AWS CLI (`aws`)**, **Azure CLI (`az`)**, and **Google Cloud CLI (`gcloud`)**.

---

## 1. Core Technical Definitions

> **Cloud IAM (Identity & Access):** Authorization framework binding authenticated entities (users, service accounts) to permission roles across cloud resources.
>
> **Object Storage (S3 / Blob / GCS):** Highly scalable, internet-accessible key-value storage for unstructured files and media blobs.
>
> **Compute Instance (EC2 / VM / GCE):** Virtualized server slices running Linux/Windows OS on top of cloud hypervisors.
>
> **Managed Kubernetes (EKS / AKS / GKE):** Cloud-managed Kubernetes control planes with automated patching, node pooling, and VPC integration.

---

## 2. Authentication & Configuration

| Cloud Provider | Authentication / Login | Configuration / Profile | Set Active Project / Region |
|---|---|---|---|
| **AWS CLI** (`aws`) | `aws configure` | `aws configure --profile prod` | `aws configure set region us-east-1` |
| **Azure CLI** (`az`) | `az login` | `az account list --output table` | `az account set --subscription "<sub-id>"` |
| **Google Cloud** (`gcloud`) | `gcloud auth login` | `gcloud config configurations create prod` | `gcloud config set project my-project-id` |

---

## 3. Object Storage (S3 / Blob / Cloud Storage)

| Operation | AWS S3 (`aws s3`) | Azure Blob Storage (`az storage blob`) | Google Cloud Storage (`gcloud storage`) |
|---|---|---|---|
| **List Buckets** | `aws s3 ls` | `az storage container list --account-name acct` | `gcloud storage buckets list` |
| **List Objects** | `aws s3 ls s3://my-bucket/` | `az storage blob list -c container` | `gcloud storage ls gs://my-bucket/` |
| **Upload File** | `aws s3 cp file.txt s3://my-bucket/` | `az storage blob upload -c cont -f file.txt -n file.txt` | `gcloud storage cp file.txt gs://my-bucket/` |
| **Download File** | `aws s3 cp s3://my-bucket/file.txt .` | `az storage blob download -c cont -n file.txt -f file.txt` | `gcloud storage cp gs://my-bucket/file.txt .` |
| **Sync Directory** | `aws s3 sync ./dist s3://my-bucket/` | `az storage blob sync -c cont -s ./dist` | `gcloud storage rsync ./dist gs://my-bucket/` |
| **Delete Object** | `aws s3 rm s3://my-bucket/file.txt` | `az storage blob delete -c cont -n file.txt` | `gcloud storage rm gs://my-bucket/file.txt` |

---

## 4. Compute & Virtual Machines (EC2 / VM / GCE)

| Operation | AWS EC2 (`aws ec2`) | Azure VM (`az vm`) | Google Compute Engine (`gcloud compute`) |
|---|---|---|---|
| **List Instances** | `aws ec2 describe-instances` | `az vm list -d -o table` | `gcloud compute instances list` |
| **Start VM** | `aws ec2 start-instances --instance-ids i-123` | `az vm start -g rg -n my-vm` | `gcloud compute instances start my-vm` |
| **Stop VM** | `aws ec2 stop-instances --instance-ids i-123` | `az vm stop -g rg -n my-vm` | `gcloud compute instances stop my-vm` |
| **Restart VM** | `aws ec2 reboot-instances --instance-ids i-123`| `az vm restart -g rg -n my-vm` | `gcloud compute instances reset my-vm` |
| **SSH to VM** | `ssh -i key.pem ubuntu@<Public-IP>` | `az vm ssh -g rg -n my-vm` | `gcloud compute ssh my-vm --zone=us-central1-a`|

---

## 5. Serverless & Functions (Lambda / Functions / Cloud Run)

| Action | AWS Lambda (`aws lambda`) | Azure Functions (`az functionapp`) | Google Cloud Run / Functions (`gcloud`) |
|---|---|---|---|
| **List Functions** | `aws lambda list-functions` | `az functionapp list -o table` | `gcloud run services list` |
| **Invoke Function** | `aws lambda invoke --function-name fn out.json` | `az functionapp function show -g rg -n app --function-name fn` | `gcloud functions call fn --data '{"k":"v"}'` |
| **Deploy App/Image** | `aws lambda update-function-code --function-name fn --zip-file fileb://app.zip` | `az functionapp deployment source config-zip -g rg -n fn --src app.zip` | `gcloud run deploy my-svc --image gcr.io/proj/app:latest --allow-unauthenticated` |

---

## 6. Managed Kubernetes (EKS / AKS / GKE)

| Action | AWS EKS (`aws eks`) | Azure AKS (`az aks`) | Google GKE (`gcloud container`) |
|---|---|---|---|
| **List Clusters** | `aws eks list-clusters` | `az aks list -o table` | `gcloud container clusters list` |
| **Update `kubectl` Config** | `aws eks update-kubeconfig --name prod-cluster` | `az aks get-credentials -g rg -n prod-cluster` | `gcloud container clusters get-credentials prod-cluster --region us-central1` |

---

## 7. Output Formatting & CLI Query Filters

```text
# AWS JMESPath query filtering:
aws ec2 describe-instances --query "Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress]" --output table

# Azure CLI TSV / JMESPath filtering:
az vm list --query "[?powerState=='VM running'].{Name:name, ResourceGroup:resourceGroup}" -o table

# Google Cloud format & filter:
gcloud compute instances list --filter="status=RUNNING" --format="table(name,zone,networkInterfaces[0].accessConfigs[0].natIP)"
```
