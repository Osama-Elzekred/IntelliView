#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE.md file in the project root for full license information.

import json
import logging
import os
import sys
import time
from pathlib import Path
import argparse
import requests

logging.basicConfig(stream=sys.stdout, level=logging.INFO,  # set to logging.DEBUG for verbose output
        format="[%(asctime)s] %(message)s", datefmt="%m/%d/%Y %I:%M:%S %p %Z")
logger = logging.getLogger(__name__)

# Your Speech resource key and region
# This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
parser = argparse.ArgumentParser()
parser.add_argument("--voice", default="en-US-JennyNeural")
parser.add_argument("--name", default="Simple avatar synthesis")
parser.add_argument("--description", default="Simple avatar synthesis description")
parser.add_argument("--input", default="Hi, I'm a virtual assistant created by Microsoft.")
parser.add_argument("--service_host", default="customvoice.api.speech.microsoft.com")
parser.add_argument("--talking_avatar_character", default="lisa")
parser.add_argument("--talking_avatar_style", default="graceful-sitting")
parser.add_argument("--background_color", default="transparent")
parser.add_argument("--subtitle_type", default="soft_embedded")
parser.add_argument("--videocodec", default="vp9")
parser.add_argument("--text_type", default="PlainText")

SUBSCRIPTION_KEY = os.getenv("SUBSCRIPTION_KEY", '306a1f1015aa4cf6b54d6ab9c8032559')
SERVICE_REGION = os.getenv("SERVICE_REGION", "westeurope")

args = parser.parse_args()
VOICE = args.voice
NAME = args.name
DESCRIPTION = args.description
INPUT = args.input
SERVICE_HOST = args.service_host
TALKING_AVATAR_CHARACTER = args.talking_avatar_character
TALKING_AVATAR_STYLE = args.talking_avatar_style
BACKGROUND_COLOR = args.background_color
SUBTITLE_TYPE = args.subtitle_type
VIDEOCODEC = args.videocodec
TEXT_TYPE = args.text_type
def submit_synthesis():
    url = f'https://{SERVICE_REGION}.{SERVICE_HOST}/api/texttospeech/3.1-preview1/batchsynthesis/talkingavatar'
    header = {
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
        'Content-Type': 'application/json'
    }

    payload = {
        'displayName': NAME,
        'description': DESCRIPTION,
        "textType": TEXT_TYPE,
        'synthesisConfig': {
            "voice": VOICE,
        },
        # Replace with your custom voice name and deployment ID if you want to use custom voice.
        # Multiple voices are supported, the mixture of custom voices and platform voices is allowed.
        # Invalid voice name or deployment ID will be rejected.
        'customVoices': {
            # "YOUR_CUSTOM_VOICE_NAME": "YOUR_CUSTOM_VOICE_ID"
        },
        "inputs": [
            {
                "text": INPUT,
            },
        ],
        "properties": {
            "customized": False, # set to True if you want to use customized avatar
            "talkingAvatarCharacter": TALKING_AVATAR_CHARACTER,  # talking avatar character
            "talkingAvatarStyle": TALKING_AVATAR_STYLE,  # talking avatar style, required for prebuilt avatar, optional for custom avatar
            "videoFormat": "webm",  # mp4 or webm, webm is required for transparent background
            "videoCodec": VIDEOCODEC,  # hevc, h264 or vp9, vp9 is required for transparent background; default is hevc
            "subtitleType": SUBTITLE_TYPE,
            "backgroundColor": BACKGROUND_COLOR,
        }
    }

    response = requests.post(url, json.dumps(payload), headers=header)
    if response.status_code < 400:
        logger.info('Batch avatar synthesis job submitted successfully')
        logger.info(f'Job ID: {response.json()["id"]}')
        return response.json()["id"]
    else:
        logger.error(f'Failed to submit batch avatar synthesis job: {response.text}')


def get_synthesis(job_id):
    url = f'https://{SERVICE_REGION}.{SERVICE_HOST}/api/texttospeech/3.1-preview1/batchsynthesis/talkingavatar/{job_id}'
    header = {
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
    }
    response = requests.get(url, headers=header)
    if response.status_code < 400:
        logger.debug('Get batch synthesis job successfully')
        logger.debug(response.json())
        if response.json()['status'] == 'Succeeded':
            logger.info(f'Batch synthesis job succeeded, download URL: {response.json()["outputs"]["result"]}')
        return response.json()['status']
    else:
        logger.error(f'Failed to get batch synthesis job: {response.text}')
  
  
def list_synthesis_jobs(skip: int = 0, top: int = 100):
    """List all batch synthesis jobs in the subscription"""
    url = f'https://{SERVICE_REGION}.{SERVICE_HOST}/api/texttospeech/3.1-preview1/batchsynthesis/talkingavatar?skip={skip}&top={top}'
    header = {
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
    }
    response = requests.get(url, headers=header)
    if response.status_code < 400:
        logger.info(f'List batch synthesis jobs successfully, got {len(response.json()["values"])} jobs')
        logger.info(response.json())
    else:
        logger.error(f'Failed to list batch synthesis jobs: {response.text}')
  
  
if __name__ == '__main__':
    job_id = submit_synthesis()
    if job_id is not None:
        while True:
            status = get_synthesis(job_id)
            if status == 'Succeeded':
                logger.info('batch avatar synthesis job succeeded')
                break
            elif status == 'Failed':
                logger.error('batch avatar synthesis job failed')
                break
            else:
                logger.info(f'batch avatar synthesis job is still running, status [{status}]')
                time.sleep(5)
