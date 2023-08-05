#!/bin/sh

function import {
  terraform \
    import \
    -var="onepassword_token=$ONEPASSWORD_TOKEN"\
    "$1" "$2"
}

function plan {
  terraform plan \
    -var "onepassword_token=$ONEPASSWORD_TOKEN"
}

import "keycloak_openid_client.video_manager_client_dev" "apps-dev/19817468-5a8b-4044-bdd2-93672a46f1f7"
import "keycloak_openid_client.video_manager_client_prod" "apps-prod/87df63cf-58ae-4aa7-b2ee-5e47cb2e05f0"

plan
