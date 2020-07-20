#!/usr/bin/env python3
from setuptools import setup

with open('README.md') as readme_file:
    readme = readme_file.read()

setup(name='soaparse',
      version='1.3.0',
      description='Sane, modular DNS authority (SOA) record parsing',
      long_description=readme,
      long_description_content_type='text/markdown',
      url='https://github.com/wesinator/soaparse',
      author='wesinator',
      keywords='dns',
      packages=['soaparse'],
      classifiers=[
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Mozilla Public License 2.0 (MPL 2.0)',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
      ],
      zip_safe=True)
