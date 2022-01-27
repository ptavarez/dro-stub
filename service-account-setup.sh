# Set parameters
export GKE_PROJECT=drostub-dev
export GKE_CLUSTER=dro-box
export GKE_APP_NAME=drostub
export GKE_SERVICE=gh-connection-service
export GKE_SERVICE_ACCOUNT=gh-serviceaccount
export GKE_DEPLOYMENT_NAME=drostub-dev-deployment
export GKE_REGION=us-east4
export GKE_ZONE=us-east4-a

gcloud config set project $GKE_PROJECT
gcloud config set compute/zone $GKE_ZONE
gcloud config set compute/region $GKE_REGION

# Configure kubctl
gcloud container clusters get-credentials $GKE_CLUSTER

# enable API
gcloud services enable \
	containerregistry.googleapis.com \
	container.googleapis.com \
  artifactregistry.googleapis.com

# Create a service account
gcloud iam service-accounts create $GKE_SERVICE_ACCOUNT \
    --display-name "GitHub Deployment" \
    --description "Used to deploy from GitHub Actions to GKE"

# Get mail of service account
gcloud iam service-accounts list

export GKE_SVC_MAIL="$GKE_SERVICE_ACCOUNT@$GKE_PROJECT.iam.gserviceaccount.com"

# Add 'container.clusterAdmin' role:
gcloud projects add-iam-policy-binding $GKE_PROJECT \
  --member=serviceAccount:$GKE_SVC_MAIL \
  --role=roles/container.clusterAdmin 

# Add 'artifactregistry.admin' role:
gcloud projects add-iam-policy-binding $GKE_PROJECT \
  --member=serviceAccount:$GKE_SVC_MAIL \
  --role=roles/artifactregistry.admin

# Download JSON
gcloud iam service-accounts keys create key.json --iam-account=$GKE_SVC_MAIL

echo ""
echo "Please create a secret named 'GKE_SA_KEY' in GitHub with the followign content:"
echo ""
cat key.json | base64
echo ""